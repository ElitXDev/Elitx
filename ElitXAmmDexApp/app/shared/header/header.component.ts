import { Component, Input, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('title') title = '';
  @Input('desc1') desc1 = '';
  direction = true;
  currentScreenSize = '';
  breakpoints = this.bPService.breakpoints;

  constructor(
    public dialogService: DialogService,
    private bPService: BreakpointService
  ) {
    bPService.currentScreenSize.subscribe((v) => (this.currentScreenSize = v));
  }

  changeDirection() {
    this.direction = !this.direction;
  }

  ngOnInit() {}
}
