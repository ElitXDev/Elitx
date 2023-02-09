import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action = '', duration = 3000) {
    this._snackBar.open(message, action, { duration: duration });
  }
}
