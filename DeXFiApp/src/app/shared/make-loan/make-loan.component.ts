import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { GlobalConstants as GC } from 'src/app/global-constants';
import { AccountService } from '../../services/account.service';
import { XService } from '../../services/x.service';
import { MatStepper } from '@angular/material/stepper';
import { SnackbarService } from '../../services/snackbar.service';
import * as xrpl from 'xrpl';

enum Role {
  borrower = 1,
  lender,
}

@Component({
  selector: 'app-make-loan',
  templateUrl: './make-loan.component.html',
  styleUrls: ['./make-loan.component.scss'],
})
export class MakeLoanComponent implements OnInit {
  form!: FormGroup;
  termsAgreement = false;
  loading = false;
  readonly minFee = 10;
  readonly feePercentage = 0.001;
  readonly accs = [...this.accService.accounts];
  readonly hookAddress = GC.hookAddress;
  readonly currencies = [...GC.currencies];
  readonly roles = [...GC.roles];
  acc = 0;
  role = 0;
  loanCurrency = 0;
  collateralCurrency = 0;
  interestRate = 0;
  loanPeriod = 0;
  loanAmount = 0;
  loanFee = 0;
  loanInterest = 0;
  collateralAmount = 0;
  collateralFee = 0;
  collateralInterest = 0;
  memo = '';
  readonly addressSnackbarMessage = 'Address copied to the clipboard';
  readonly addressSnackbarAction = '';
  readonly addressSnackbarDuration = 3000;
  readonly errorSnackbarAction = '';
  readonly errorSnackbarDuration = 7000;

  constructor(
    public dialogService: DialogService,
    private accService: AccountService,
    private x: XService,
    public snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup(
      {
        account: new FormControl(0, [Validators.required]),
        role: new FormControl(1, [Validators.required]),
        loanCurrency: new FormControl(0, [Validators.required]),
        loanAmount: new FormControl('', [
          Validators.min(this.minFee * 2),
          Validators.max(99999999999),
          Validators.required,
        ]),
        collateralCurrency: new FormControl(1, [Validators.required]),
        collateralAmount: new FormControl('', [
          Validators.min(this.minFee * 2),
          Validators.max(99999999999),
        ]),
        interestRate: new FormControl('', [
          Validators.max(99),
          Validators.min(0.001),
          Validators.required,
        ]),
        loanPeriod: new FormControl('', [
          Validators.max(9999),
          Validators.min(1),
          Validators.required,
        ]),
      },
      {
        validators: [
          this.differentCurrencies(),
          this.validInterest(),
          this.validDecimals(),
        ],
      }
    );
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.acc = this.form.get('account')!.value;
        this.role = this.form.get('role')!.value;
        this.loanCurrency = this.form.get('loanCurrency')!.value;
        this.collateralCurrency = this.form.get('collateralCurrency')!.value;
        this.interestRate = this.form.value.interestRate;
        this.loanPeriod = this.form.value.loanPeriod;
        this.loanAmount = this.form.value.loanAmount;
        this.collateralAmount = this.form.value.collateralAmount;
      }
    });
  }

  reset(stepper: MatStepper) {
    this.termsAgreement = false;
    stepper.reset();
    this.form.reset({
      account: 0,
      role: 1,
      loanCurrency: 0,
      loanAmount: '',
      collateralCurrency: 1,
      collateralAmount: '',
      interestRate: '',
      loanPeriod: '',
    });
  }

  validDecimals(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var invalid = false;
      const fields = ['loanAmount', 'collateralAmount', 'interestRate'];
      const decimals = [6, 6, 3];
      for (var i = 0; i < fields.length; i++) {
        var f = String(control.get(fields[i])?.value);
        if (f.includes('.'))
          if (f.split('.')[1].length > decimals[i]) {
            control.get(fields[i])?.setErrors({
              validDecimals: `Up to ${decimals[i]} decimals allowed`,
            });
            invalid = true;
          }
      }
      return invalid ? { value: true } : null;
    };
  }

  validInterest(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lp = control.get('loanPeriod');
      const ir = control.get('interestRate');
      if (lp!.value && ir!.value) {
        var msg =
          (lp!.value * ir!.value) / 365 > 90
            ? { validInterest: 'Overall interest can not be more than 90%' }
            : null;
        lp!.setErrors(msg);
        ir!.setErrors(msg);
        return msg ? { value: true } : null;
      }
      return null;
    };
  }

  differentCurrencies(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lc = control.get('loanCurrency')!;
      const cc = control.get('collateralCurrency')!;
      const msg =
        lc.value == cc.value
          ? {
              differentCurrencies:
                'Loan currency can not be collateral currency',
            }
          : null;
      lc.setErrors(msg);
      cc.setErrors(msg);
      return msg ? { value: true } : null;
    };
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    if (this.form.valid && this.updateValues()) stepper.next();
  }

  updateValues() {
    try {
      this.loanFee = Math.max(
        this.minFee,
        this.loanAmount * this.feePercentage
      );
      this.loanInterest =
        (((this.loanAmount * this.loanPeriod) / 100) * this.interestRate) / 365;

      this.collateralFee = Math.max(
        this.minFee,
        this.collateralAmount * this.feePercentage
      );
      this.collateralInterest =
        (((this.collateralAmount * this.loanPeriod) / 100) *
          this.interestRate) /
        365;

      var mca = this.collateralAmount + '';
      mca = mca.includes('.')
        ? (mca.split('.')[0] + mca.split('.')[1].padEnd(6, '0')).padStart(
            20,
            '0'
          )
        : (mca + '0'.repeat(6)).padStart(20, '0');
      var mla = this.loanAmount + '';
      mla = mla.includes('.')
        ? (mla.split('.')[0] + mla.split('.')[1].padEnd(6, '0')).padStart(
            20,
            '0'
          )
        : (mla + '0'.repeat(6)).padStart(20, '0');
      var mir = this.interestRate + '';
      mir = mir.includes('.')
        ? (mir.split('.')[0] + mir.split('.')[1].padEnd(3, '0')).padStart(
            5,
            '0'
          )
        : (mir + '0'.repeat(3)).padStart(5, '0');

      this.memo =
        '1' +
        this.role +
        String(this.loanCurrency).padStart(3, '0') +
        mla +
        String(this.collateralCurrency).padStart(3, '0') +
        mca +
        mir +
        String(this.loanPeriod).padStart(5, '0');
      return true;
    } catch (error) {
      // console.log(error);
      this.snackBarService.openSnackBar(
        error + '',
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
      return false;
    }
  }

  getAmount() {
    var amt =
      this.role == Role.borrower
        ? this.collateralAmount + this.collateralFee
        : this.loanAmount + this.loanFee;
    var amount;
    if (
      (this.role == Role.lender && this.loanCurrency != 0) ||
      (this.role == Role.borrower && this.collateralCurrency != 0)
    ) {
      amount =
        this.role == Role.borrower
          ? {
              currency: this.currencies[this.collateralCurrency].name,
              value: amt + '',
              issuer: this.currencies[this.collateralCurrency].address,
            }
          : {
              currency: this.currencies[this.loanCurrency].name,
              value: amt + '',
              issuer: this.currencies[this.loanCurrency].address,
            };
    } else amount = xrpl.xrpToDrops(amt);
    return amount;
  }

  async createOffer(stepper: MatStepper) {
    this.loading = true;
    try {
      var preparedPayment: xrpl.Payment = await this.x.client.autofill({
        TransactionType: 'Payment',
        Account: this.accs[this.acc].address,
        Amount: this.getAmount(),
        Destination: this.hookAddress,
        Fee: '100000',
        Memos: [
          {
            Memo: {
              MemoType: xrpl.convertStringToHex('Description'),
              MemoFormat: xrpl.convertStringToHex('text/plain'),
              MemoData: xrpl.convertStringToHex(this.memo),
            },
          },
        ],
      });
      var signed = this.accs[this.acc].wallet!.sign(preparedPayment);
      var submit = await this.x.client.submitAndWait(signed.tx_blob);
      if (
        typeof submit.result.meta! !== 'string' &&
        submit.result.meta!.TransactionResult == 'tesSUCCESS'
      )
        this.x.setNewOffer();
      this.snackBarService.openSnackBar(
        'Congrats! Chek out your new offer above!',
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
      this.reset(stepper);
    } catch (error: any) {
      this.snackBarService.openSnackBar(
        error,
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
    }
    this.loading = false;
  }
}
