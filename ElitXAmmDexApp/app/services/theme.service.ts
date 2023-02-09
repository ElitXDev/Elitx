import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITheme } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themes: ITheme[] = [
    { name: 'blue-dark', icon: 'nights_stay' },
    { name: 'blue', icon: 'light_mode' },
  ];
  theme = this.themes[0];
  public tc = new BehaviorSubject(this.theme);

  constructor(private overlay: OverlayContainer) {}

  initTheme() {
    var localTheme = window.localStorage.getItem('selectedTheme');
    if (localTheme) {
      this.theme =
        localTheme === this.theme.name ? this.themes[1] : this.themes[0];
      this.toggleTheme();
    } else {
      this.overlay.getContainerElement().classList.add(this.themes[0].name);
    }
  }

  toggleTheme() {
    if (this.theme.name === this.themes[1].name) {
      this.theme = this.themes[0];
      this.overlay.getContainerElement().classList.remove(this.themes[1].name);
      this.overlay.getContainerElement().classList.add(this.themes[0].name);
    } else {
      this.theme = this.themes[1];
      this.overlay.getContainerElement().classList.remove(this.themes[0].name);
      this.overlay.getContainerElement().classList.add(this.themes[1].name);
    }
    window.localStorage.setItem('selectedTheme', this.theme.name);
    this.tc.next(this.theme);
    // console.log(this.overlay.getContainerElement().classList);
  }

  get currentTheme() {
    return this.theme;
  }
}
