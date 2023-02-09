import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { VideoParams } from '../../interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss'],
})
export class VideoDialogComponent implements OnInit {
  apiLoaded = false;

  constructor(
    private dialogRef: MatDialogRef<VideoDialogComponent>,
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public params: VideoParams
  ) {}

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  stateChange(event: YT.OnStateChangeEvent) {
    if (event.data == 0) this.dialogRef.close();
  }

  public close(value = true) {
    this.dialogRef.close(value);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(true);
  }
}
