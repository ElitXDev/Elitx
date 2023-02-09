import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
  cols = 0;
  rowHeight = '1:1';
  imgs = [
    '../../../assets/images/icons/business.png',
    '../../../assets/images/icons/studies.png',
    '../../../assets/images/icons/optimize.png',
    '../../../assets/images/icons/marketing.png',
    '../../../assets/images/icons/strategy.png',
    '../../../assets/images/icons/growth.png',
    '../../../assets/images/icons/research.png',
    '../../../assets/images/icons/innovation.png',
  ];

  headlines = [
    'Secure',
    'Simple',
    'Fast',
    'Low Cost',
    'Open Market',
    'Best Interest',
    'Flexible Term',
    'Your Needs',
  ];

  texts = [
    "By far the most secure DeFi in the entire industry. No third-party solutions or browser extensions are required. Just make a transaction with your favorite wallet - that's it!",
    'Get a loan in less than 1 minute. Create or choose an existing loan, scan a QR code with your favorite wallet and approve the transaction. Congratulations - you got a loan!',
    "Decisions made in seconds! You don't have to wait minutes or even hours for approval - the XRPL processes your transactions within 3-4 seconds !",
    "Profits are yours - not someone else's! The service costs are only as high as necessary to be able to offer a safe, sustainable and long-lasting service.",
    'Open and decentralized like the XRPL! There are no restrictions on using this service. You have an XRPL account - you can get a loan. Just go and get it.',
    'No intermediary, powerful technology and a peer-to-peer deal guarantee you the best possible interest rates. Nobody but the free market influences interest rates!',
    "You need a loan for a specific and not for a predetermined period of time - that's exactly what you will find here. Loans from 1 day to 30 years and everything in between!",
    "Loans as flexible as you are! If you don't find what you're looking for in one of the existing loans, simply create one yourself. Your loan - your conditions. Just go and create it!",
  ];

  constructor() {}

  ngOnInit(): void {
    this.adjustCols();
  }

  onResize(event: any) {
    this.adjustCols();
  }

  adjustCols() {
    if (window.innerWidth >= 1920) {
      this.cols = 4;
      // this.rowHeight = '1:1';
    } else if (window.innerWidth >= 1280) {
      this.cols = 4;
    } else if (window.innerWidth >= 960) {
      this.cols = 3;
    } else if (window.innerWidth >= 600) {
      this.cols = 2;
    } else {
      this.cols = 1;
    }
  }
}
