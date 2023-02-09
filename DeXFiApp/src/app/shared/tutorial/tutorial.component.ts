import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/interface';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  headline = 'Learn more about our amazing products';
  videos: Video[] = [
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
  videoIdx = 0;
  params: YT.PlayerOptions = {
    videoId: 'rmov7U98M5s',
    width: 0,
    height: 0,
    playerVars: {
      autoplay: 1,
    },
  };

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  async selectVideo() {
    await new Promise((resolve) => setTimeout(resolve, 1));
    const param = new URL(this.videos[this.videoIdx].link).searchParams;
    this.params.videoId = param.get('v')!;
    this.openVideoDialog();
  }

  openVideoDialog() {
    this.dialogService.openVideoDialog(this.params);
  }
}
