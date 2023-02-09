import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationDirective } from './directives/animations/animations.directive';
import { MaterialModule } from './modules/material.module';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { MissionComponent } from './shared/mission/mission.component';
import { VideoComponent } from './shared/video/video.component';
import { FaqComponent } from './shared/faq/faq.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderSmallComponent } from './shared/header-small/header-small.component';
import { AboutComponent } from './shared/about/about.component';
import { VideoDialogComponent } from './shared/video-dialog/video-dialog.component';
import { FundsDisclaimerComponent } from './shared/funds-disclaimer/funds-disclaimer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DonationDialogComponent } from './shared/donation-dialog/donation-dialog.component';
import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker';
import { NgxMatomoRouterModule } from '@ngx-matomo/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { TradeComponent } from './pages/trade/trade.component';
import { LiquidityComponent } from './pages/liquidity/liquidity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxEchartsModule } from 'ngx-echarts';
import { ElevationDirective } from './directives/elevation.directive';
import { AmmDepositComponent } from './shared/amm-deposit/amm-deposit.component';
import { AmmWithdrawComponent } from './shared/amm-withdraw/amm-withdraw.component';
import { AmmCreateComponent } from './shared/amm-create/amm-create.component';
import { AmmVoteComponent } from './shared/amm-vote/amm-vote.component';
import { HttpClientModule } from '@angular/common/http';
import { ComingSoonComponent } from './shared/coming-soon/coming-soon.component';
import { AccountDialogComponent } from './shared/account-dialog/account-dialog.component';
import { XummDialogComponent } from './shared/xumm-dialog/xumm-dialog.component';
import { AmmSwapComponent } from './shared/amm-swap/amm-swap.component';
import { PoolCompositionComponent } from './shared/pool-composition/pool-composition.component';
import { AmmAuctionComponent } from './shared/amm-auction/amm-auction.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationDirective,
    PagesComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    MissionComponent,
    VideoComponent,
    FaqComponent,
    FooterComponent,
    HeaderSmallComponent,
    AboutComponent,
    VideoDialogComponent,
    FundsDisclaimerComponent,
    SpinnerComponent,
    DonationDialogComponent,
    TradeComponent,
    LiquidityComponent,
    ElevationDirective,
    AmmDepositComponent,
    AmmWithdrawComponent,
    AmmCreateComponent,
    AmmVoteComponent,
    ComingSoonComponent,
    AccountDialogComponent,
    XummDialogComponent,
    AmmSwapComponent,
    PoolCompositionComponent,
    AmmAuctionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatomoTrackerModule.forRoot({
      trackerUrl: 'https://matomo.dexfi.pro/matomo/matomo.php',
      siteId: '2',
      scriptUrl: 'https://matomo.dexfi.pro/matomo/matomo.js',
    }),
    NgxMatomoRouterModule,
    // NgxEchartsModule.forRoot({
    //   echarts: () => import('echarts'),
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
