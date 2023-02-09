import { Component } from '@angular/core';
import { Faq } from 'src/assets/faq';
import { FAQ } from '../../interface';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  step = -1;
  names = Faq.names;
  faq = [...Faq.specificFaqs[0], ...Faq.generalFaqs] as FAQ[];

  setFaq(idx: number) {
    this.faq = [...Faq.specificFaqs[idx], ...Faq.generalFaqs] as FAQ[];
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
