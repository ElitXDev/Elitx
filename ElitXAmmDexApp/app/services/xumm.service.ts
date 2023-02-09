import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { XummPkce, ResolvedFlow } from 'xumm-oauth2-pkce';
import { SnackbarService } from './snackbar.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class XummService {
  xumm = new XummPkce('876af3b9-add4-4e30-aa91-406e71bff42c', {
    // implicit: true,
    // redirectUrl: document.location.href,
  });
  readonly loggedIn$ = new BehaviorSubject(false);
  session?: ResolvedFlow;

  constructor(
    private sbService: SnackbarService,
    private dialogService: DialogService
  ) {
    this.xumm.on('retrieved', async () => {
      this.session = await this.xumm.state();
      // console.log('retrieved: ', this.session);
      this.loggedIn$.next(typeof this.session !== 'undefined' ? true : false);
    });
    this.xumm.on('error', (e) => {
      this.sbService.openSnackBar(e.message);
      console.log('error: ', e);
    });
    this.xumm.on('success', () => {
      this.loggedIn$.next(true);
      // console.log('success: ', this.session);
    });
    this.xumm.on('loggedout', () => {
      this.loggedIn$.next(false);
      this.session = undefined;
      // console.log('loggedout: ', this.session);
    });
  }

  async login() {
    this.session = await this.xumm.authorize();
  }

  logout() {
    this.xumm.logout();
    this.sbService.openSnackBar('Logged out');
  }

  get Address() {
    return this.session?.me.account;
  }

  async sendPayload(txJson: any) {
    try {
      const pl = await this.session?.sdk.payload.createAndSubscribe(
        txJson,
        (res) => {
          // console.log('Res Data: ', res.data);
          if (typeof res.data['signed'] !== 'undefined') {
            if (res.data['signed']) this.dialogService.closeXummDialog();
            this.sbService.openSnackBar(
              res.data['signed']
                ? 'Transaction suceeded!'
                : 'Transaction failed!'
            );
            return res.data;
          }
        }
      );
      console.log('PL:', pl);
      if (typeof pl !== 'undefined') {
        this.dialogService.openXummDialog(
          pl.created.next.always, //'https://xumm.app/sign/859206a5-8dd3-43e2-956f-966d3078ebf6', //
          pl.created.refs.qr_png //'https://xumm.app/sign/859206a5-8dd3-43e2-956f-966d3078ebf6_q.png' //
        );
        this.sbService.openSnackBar(
          'A push notification has been sent to your XUMM wallet'
        );
      }
    } catch (e) {
      this.sbService.openSnackBar(
        'Transaction could not be created. Please retry!'
      );
    }
  }
}
