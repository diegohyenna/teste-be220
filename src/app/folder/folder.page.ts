import { Observable, Subject } from 'rxjs';
import { Component, inject, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService, Program } from '../services/api.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, AfterContentInit {
  folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  constructor() {}

  personal?: any = [];
  programs?: any = [];

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.apiService.getProgramsDesactive();
    this.apiService.getProgramsByActive();
  }

  ngAfterContentInit() {
    this.apiService.programsDesactived.subscribe((items) => {
      this.personal = items;
    });
    this.apiService.programs.subscribe((items) => {
      this.programs = items;
    });
  }
}
