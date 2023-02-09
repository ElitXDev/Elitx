import { Component } from '@angular/core';
import { ITheme } from './interfaces/interface';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Xwap';
  theme!: ITheme;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.tc.subscribe((value: ITheme) => (this.theme = value));
    this.themeService.initTheme();
  }
}
