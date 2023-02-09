import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-img-small',
  templateUrl: './header-img-small.component.html',
  styleUrls: ['./header-img-small.component.scss'],
})
export class HeaderImgSmallComponent implements OnInit {
  @Input('title') title = '';
  @Input('desc') desc = '';

  constructor() {}

  ngOnInit(): void {}
}
