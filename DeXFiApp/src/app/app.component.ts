import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from './services/dialog.service';
import { AccountService } from './services/account.service';
import { ThemeService } from './services/theme.service';
import { Theme } from './interface';
import { XService } from './services/x.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  theme!: Theme;
  cookiesConsent = false;

  constructor(
    public dialogService: DialogService,
    private accountService: AccountService,
    private themeService: ThemeService,
    private x: XService
  ) {}

  ngOnInit() {
    this.themeService.tc.subscribe((value) => (this.theme = value));
    this.themeService.initTheme();

    var cc = window.localStorage.getItem('cookiesConsent');
    // if (cc != 'true') this.dialogService.openCookieDialog();

    this.x.connect();

    var seeds: string[] = [];
    for (let i = 0; i < 4; i++) {
      var seed = window.localStorage.getItem('w' + i);
      if (seed) seeds.push(seed);
    }
    this.accountService.createAccount(seeds);
  }

  ngOnDestroy(): void {
    this.x.disconnect();
  }
}
