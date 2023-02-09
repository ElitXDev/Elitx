import { Component } from '@angular/core';
import { Faq } from 'src/assets/faq';
import { IFAQ } from '../../interfaces/interface';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  step = -1;
  names = Faq.names;
  faq = [...Faq.specificFaqs[0], ...Faq.generalFaqs] as IFAQ[];

  setFaq(idx: number) {
    this.faq = [...Faq.specificFaqs[idx], ...Faq.generalFaqs] as IFAQ[];
    this.step = -1;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
