import {
  Component,
  Input,
  ViewChildren,
  inject,
  OnChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnChanges {
  @ViewChildren('cardElement') cardElements: any;
  @Input({ required: true }) title?: string;
  @Input() icon?: string;
  @Input() badge?: string;
  @Input({ required: true }) items: any;

  loading = false;

  private apiService = inject(ApiService);

  constructor() {
    this.loading = true;
  }

  ngOnChanges(current: any) {
    this.items = current.items.currentValue;
    if (this.items.length) this.loading = false;
    else
      setTimeout(() => {
        this.loading = false;
      }, 5000);
  }

  activedCard(el: any) {
    this.cardElements?._results.map((el: any) => {
      if (el?.nativeElement?.classList.contains('active'))
        el?.nativeElement?.classList.remove('active');
    });

    el.classList.toggle('active');
  }

  openExercise(id: string) {
    this.apiService.setActiveProgram(id, true);
  }

  closeExercise(id: string) {
    this.apiService.setActiveProgram(id, false);
  }
}
