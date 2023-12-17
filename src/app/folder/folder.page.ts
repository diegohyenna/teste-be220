import { Component, inject, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  personal: any = [];
  programs: any = [];

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    of([
      {
        title: 'costas express',
        src: 'assets/imgs/muscle-01.jpg',
      },
      {
        title: 'yoga express',
        src: 'assets/imgs/muscle-02.jpg',
      },
      {
        title: 'levantamento de peso',
        src: 'assets/imgs/muscle-03.jpg',
      },
    ])
      .pipe(delay(1000))
      .subscribe((res) => (this.personal = res));

    of([
      {
        active: true,
        title: 'levantamento de peso',
        src: 'assets/imgs/muscle-03.jpg',
      },
      {
        title: 'yoga express',
        src: 'assets/imgs/muscle-02.jpg',
      },
      {
        title: 'costas express',
        src: 'assets/imgs/muscle-01.jpg',
      },
    ])
      .pipe(delay(2000))
      .subscribe((res) => (this.programs = res));
  }
}
