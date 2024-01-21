import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IPulledApartData } from '../../../../../../../interfaces/pulled-apart-data.interface';
import { Router } from '@angular/router';
import { RoutesApp } from '../../../../../../constants';

@Component({
  selector: 'app-module-item',
  standalone: true,
  imports: [NgIf, NzCardModule],
  template: `
    <!-- <p>modul-item works!</p>  -->
    <nz-card nzHoverable *ngIf="modul" (click)="openPulledApart()">
      <!-- [routerLink]="['/admin/home/', modul.route]" -->
      <h4>
        <b>{{ modul.label }}</b>
      </h4>
    </nz-card>
  `,
  styles: [
    `
      h4 {
        text-align: center;
        margin: 0;
      }
    `,
  ],
})
export class ModuleItemComponent {
  // @Input() modul: { label: string; route: string } | null = null;
  @Input() modul: {
    label: string;
    route: string;
    pulledApartData: IPulledApartData | null;
  } | null = null;

  constructor(private _router: Router) {}

  openPulledApart(): void {
    localStorage.setItem(
      'pulledApartData',
      JSON.stringify(this.modul?.pulledApartData)
    );
    this._router.navigate([`${RoutesApp.home}/${this.modul?.route}`]);
  }
}
