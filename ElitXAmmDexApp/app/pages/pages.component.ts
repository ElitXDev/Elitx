import { Component, HostListener, OnInit } from '@angular/core';
import { IMenuItem, ITheme } from 'src/app/interfaces/interface';
import { DialogService } from 'src/app/services/dialog.service';
import { MenuItemService } from 'src/app/services/menu-item.service';
import { ThemeService } from 'src/app/services/theme.service';
import { BreakpointService } from '../services/breakpoint.service';
import { XService } from '../services/x.service';
import { XummService } from '../services/xumm.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  loading = false;
  theme!: ITheme;
  themes = this.themeService.themes;
  tooltipMode = 'Switch between dark and light mode.';
  donationLabel = 'Tip';
  donationIcon = 'savings';
  xummIcon = 'account_circle';
  backToTopIcon = 'arrow_upward';
  currentScreenSize = '';
  breakpoints = this.bPService.breakpoints;
  menuItems = [] as IMenuItem[];
  signedIn = false;
  address?: string;
  balances: typeof this.x.balances = [];

  public showBackToTop: boolean = false;

  constructor(
    public menuItemService: MenuItemService,
    private dialogService: DialogService,
    private themeService: ThemeService,
    private bPService: BreakpointService,
    private x: XService,
    private xummService: XummService
  ) {
    x.connect(0);
    bPService.currentScreenSize.subscribe((v) => (this.currentScreenSize = v));
  }

  ngOnInit() {
    this.xummService.loggedIn$.subscribe((v) => {
      this.signedIn = v;
      this.address = this.xummService.Address;
    });
    this.themeService.tc.subscribe((value) => (this.theme = value));
    this.menuItems = this.menuItemService.items;
    // this.getBalances();
  }

  // async getBalances() {
  //   if (this.xummService.Address)
  //     this.balances = await this.x.getBalances(this.xummService.Address);
  // }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  openXuite() {
    window.open('https://tx.dexfi.pro', '_blank');
  }

  openAccountDialog() {
    this.dialogService.openAccountDialog();
  }

  async xummLogIn() {
    await this.xummService.login();
  }

  // xummLogOut() {
  //   this.xummService.logout();
  // }

  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    scrollTop > 300
      ? (this.showBackToTop = true)
      : (this.showBackToTop = false);
  }

  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      window.pageYOffset != 0
        ? window.scrollBy(0, scrollStep)
        : clearInterval(scrollInterval);
    }, 10);
  }
}
