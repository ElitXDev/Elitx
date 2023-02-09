import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'ElitX';
  desc1 =
    'Secure your financial wealth through our autopilot staking service #comingsoon!';

  constructor() {}

  ngOnInit(): void {}
}
