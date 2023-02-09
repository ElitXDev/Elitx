import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input('color') color = 'primary';
  @Input('spin') spin = true;
  @Input('value') value = '50';
  @Input('diameter') diameter = '100';
  @Input('strokeWidth') strokeWidth = '10';
  @Input('text') text = 'Loading...';
  @Input('showText') showText = false;
  @Input('animate') animate = false;
  animatedText = '';
  constructor() {}

  ngOnInit(): void {
    this.writeText();
  }
  async writeText() {
    while (this.animate) {
      for (var t of this.text) {
        this.animatedText += t;
        await new Promise((f) => setTimeout(f, 750));
      }
      for (var t of this.text) {
        this.animatedText = this.animatedText.slice(0, -1);
        await new Promise((f) => setTimeout(f, 750));
      }
    }
  }
}
