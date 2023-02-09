import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-header-img',
  templateUrl: './header-img.component.html',
  styleUrls: ['./header-img.component.scss'],
})
export class HeaderImgComponent implements OnInit {
  @Input('title') title = '';
  @Input('desc1') desc1 = '';
  direction = true;

  constructor(public dialogService: DialogService) {}

  changeDirection() {
    this.direction = !this.direction;
  }

  ngOnInit() {}
}
