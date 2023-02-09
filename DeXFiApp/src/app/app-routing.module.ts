import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LaunchpadComponent } from './pages/launchpad/launchpad.component';
import { LoanComponent } from './pages/loan/loan.component';
import { NftLoanComponent } from './pages/nft-loan/nft-loan.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { LotteryComponent } from './pages/lottery/lottery.component';
import { TicketComponent } from './pages/ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'loan', component: LoanComponent },
      { path: 'nftloan', component: NftLoanComponent },
      { path: 'lottery', component: LotteryComponent },
      { path: 'launchpad', component: LaunchpadComponent },
      { path: 'ticket', component: TicketComponent },
      {
        path: 'certificates/:certificate',
        component: CertificatesComponent,
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
