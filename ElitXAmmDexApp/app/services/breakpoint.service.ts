import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Subject, takeUntil, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  destroyed = new Subject<void>();
  currentScreenSize = new BehaviorSubject('');
  breakpoints = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];

  public showBackToTop: boolean = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe(this.breakpoints)
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        // console.log(result.breakpoints);
        for (const query of Object.keys(result.breakpoints))
          if (result.breakpoints[query]) this.currentScreenSize.next(query);
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
