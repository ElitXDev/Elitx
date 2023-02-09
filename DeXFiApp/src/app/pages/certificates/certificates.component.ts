import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  title = 'Ownership Certificate';
  desc = 'Congratulation - Great NFT';
  img = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.img =
      '/assets/certificates/' + this.route.snapshot.paramMap.get('certificate');
  }
}
