import { Component, HostListener, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { MenuItem, Theme } from '../interface';
import { MenuItemService } from '../services/menu-item.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  loading = false;
  theme!: Theme;
  tooltipMode = 'Switch between dark and light mode.';
  donationLabel = 'Tip';
  donationIcon = 'savings';
  testxuiteLabel = 'TestXuite';
  testxuiteIcon = 'construction';
  backToTopIcon = 'arrow_upward';

  menuItems = [] as MenuItem[];

  public showBackToTop: boolean = false;

  constructor(
    public menuItemService: MenuItemService,
    public dialogService: DialogService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.tc.subscribe((value) => (this.theme = value));
    this.menuItems = this.menuItemService.items;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  openXuite() {
    window.open('https://tx.dexfi.pro', '_blank');
  }

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
