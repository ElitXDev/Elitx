import { Component, OnInit } from '@angular/core';
import { IVideo } from 'src/app/interfaces/interface';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  headline = 'Learn more about our amazing products';
  videos: IVideo[] = [
    {
      title: 'P2P-Loan',
      link: 'https://www.youtube.com/watch?v=rmov7U98M5s&ab_channel=WinklerChriz',
    },
    {
      title: 'Launchpad',
      link: 'https://www.youtube.com/watch?v=3iMjGyl2mEU&ab_channel=WinklerChriz',
    },
    {
      title: 'Ticket',
      link: 'https://www.youtube.com/watch?v=EQsw9vItDZc&ab_channel=WinklerChriz',
    },
  ];
  params: YT.PlayerOptions = {
    videoId: 'rmov7U98M5s',
    width: 0,
    height: 0,
    playerVars: {
      autoplay: 1,
    },
  };
  idx = 0;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  async selectVideo(idx = 0) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    const param = new URL(this.videos[idx].link).searchParams;
    this.params.videoId = param.get('v')!;
    this.openVideoDialog();
  }

  openVideoDialog() {
    this.dialogService.openVideoDialog(this.params);
  }
}
