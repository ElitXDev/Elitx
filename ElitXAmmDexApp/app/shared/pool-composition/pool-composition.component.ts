import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pool-composition',
  templateUrl: './pool-composition.component.html',
  styleUrls: ['./pool-composition.component.scss'],
})
export class PoolCompositionComponent {
  @Input() poolData = {} as any;
}
