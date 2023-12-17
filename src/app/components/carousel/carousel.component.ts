import { Component, Input, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @ViewChildren('cardElement') cardElements: any;
  @Input({ required: true }) title!: string;
  @Input() icon?: string;
  @Input() badge?: string;
  @Input({ required: true }) items: any;

  constructor() {}

  activedCard(el: any) {
    this.cardElements?._results.map((el: any) => {
      if (el?.nativeElement?.classList.contains('active'))
        el?.nativeElement?.classList.remove('active');
    });

    el.classList.toggle('active');
  }
}
