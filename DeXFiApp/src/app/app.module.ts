import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { LoanComponent } from './pages/loan/loan.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { AboutComponent } from './shared/about/about.component';
import { CookieDialogComponent } from './shared/cookie-dialog/cookie-dialog.component';
import { DonationDialogComponent } from './shared/donation-dialog/donation-dialog.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderImgComponent } from './shared/header-img/header-img.component';
import { HeaderImgSmallComponent } from './shared/header-img-small/header-img-small.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TutorialComponent } from './shared/tutorial/tutorial.component';
import { VideoPlayerComponent } from './shared/video-player/video-player.component';
import { MissionComponent } from './shared/mission/mission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker';
import { NgxMatomoRouterModule } from '@ngx-matomo/router';
import { QRCodeModule } from 'angular2-qrcode';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TakeLoanComponent } from './shared/take-loan/take-loan.component';
import { MakeLoanComponent } from './shared/make-loan/make-loan.component';
import { FaqComponent } from './shared/faq/faq.component';
import { FundsDisclaimerComponent } from './shared/funds-disclaimer/funds-disclaimer.component';
import { NftLoanComponent } from './pages/nft-loan/nft-loan.component';
import { ComingSoonComponent } from './shared/coming-soon/coming-soon.component';
import { LaunchpadComponent } from './pages/launchpad/launchpad.component';
import { LoanAccountsComponent } from './shared/loan-accounts/loan-accounts.component';
import { LaunchpadAccountsComponent } from './shared/launchpad-accounts/launchpad-accounts.component';
import { LaunchpadOverviewComponent } from './shared/launchpad-overview/launchpad-overview.component';
import { AnimationDirective } from './directives/animations.directive';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { VideoDialogComponent } from './shared/video-dialog/video-dialog.component';
import { LotteryComponent } from './pages/lottery/lottery.component';
import { LotteryAccountsComponent } from './shared/lottery-accounts/lottery-accounts.component';
import { LotteryOverviewComponent } from './shared/lottery-overview/lottery-overview.component';
import { TicketAccountsComponent } from './shared/ticket-accounts/ticket-accounts.component';
import { TicketOverviewComponent } from './shared/ticket-overview/ticket-overview.component';
import { TicketComponent } from './pages/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoanComponent,
    NotFoundComponent,
    PagesComponent,
    AboutComponent,
    CookieDialogComponent,
    DonationDialogComponent,
    ErrorDialogComponent,
    FooterComponent,
    HeaderImgComponent,
    HeaderImgSmallComponent,
    SpinnerComponent,
    TutorialComponent,
    VideoPlayerComponent,
    MissionComponent,
    TakeLoanComponent,
    MakeLoanComponent,
    FaqComponent,
    FundsDisclaimerComponent,
    NftLoanComponent,
    ComingSoonComponent,
    LaunchpadComponent,
    LoanAccountsComponent,
    LaunchpadAccountsComponent,
    LaunchpadOverviewComponent,
    AnimationDirective,
    CertificatesComponent,
    VideoDialogComponent,
    LotteryComponent,
    LotteryAccountsComponent,
    LotteryOverviewComponent,
    TicketAccountsComponent,
    TicketOverviewComponent,
    TicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    YouTubePlayerModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    HttpClientModule,
    NgxMatomoTrackerModule.forRoot({
      trackerUrl: 'https://matomo.dexfi.pro/matomo/matomo.php',
      siteId: '1',
      scriptUrl: 'https://matomo.dexfi.pro/matomo/matomo.js',
    }),
    NgxMatomoRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
