import { Directive, ElementRef, Input } from '@angular/core';

/**
 * This directive sets a elevation to your container.
 * The default value is 6,
 * Range: 0 - 24
 */
@Directive({
  selector: '[appElevation]',
})
export class ElevationDirective {
  @Input() e = 6;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    switch (this.e) {
      case 0:
        this.el.nativeElement.style.boxShadow = 'none';
        break;
      case 1:
        this.el.nativeElement.style.boxShadow =
          '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)';
        break;
      case 2:
        this.el.nativeElement.style.boxShadow =
          '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)';
        break;
      case 3:
        this.el.nativeElement.style.boxShadow =
          '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)';
        break;
      case 4:
        this.el.nativeElement.style.boxShadow =
          '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)';
        break;
      case 5:
        this.el.nativeElement.style.boxShadow =
          '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)';
        break;
      case 6:
        this.el.nativeElement.style.boxShadow =
          '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)';
        break;
      case 7:
        this.el.nativeElement.style.boxShadow =
          '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)';
        break;
      case 8:
        this.el.nativeElement.style.boxShadow =
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)';
        break;
      case 9:
        this.el.nativeElement.style.boxShadow =
          '0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12)';
        break;
      case 10:
        this.el.nativeElement.style.boxShadow =
          '0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12)';
        break;
      case 11:
        this.el.nativeElement.style.boxShadow =
          '0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12)';
        break;
      case 12:
        this.el.nativeElement.style.boxShadow =
          '0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)';
        break;
      case 13:
        this.el.nativeElement.style.boxShadow =
          '0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12)';
        break;
      case 14:
        this.el.nativeElement.style.boxShadow =
          '0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12)';
        break;
      case 15:
        this.el.nativeElement.style.boxShadow =
          '0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)';
        break;
      case 16:
        this.el.nativeElement.style.boxShadow =
          '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)';
        break;
      case 17:
        this.el.nativeElement.style.boxShadow =
          '0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12)';
        break;
      case 18:
        this.el.nativeElement.style.boxShadow =
          '0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12)';
        break;
      case 19:
        this.el.nativeElement.style.boxShadow =
          '0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12)';
        break;
      case 20:
        this.el.nativeElement.style.boxShadow =
          '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)';
        break;
      case 21:
        this.el.nativeElement.style.boxShadow =
          '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12)';
        break;
      case 22:
        this.el.nativeElement.style.boxShadow =
          '0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12)';
        break;
      case 23:
        this.el.nativeElement.style.boxShadow =
          '0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12)';
        break;
      case 24:
        this.el.nativeElement.style.boxShadow =
          '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)';
        break;
    }
  }
}
