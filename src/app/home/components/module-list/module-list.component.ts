import { Component } from '@angular/core';
import { RoutesApp } from '../../../constants';
import { IModuleItem } from '../../../../interfaces/modul-item.interface';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [RouterLink, NgFor, NzGridModule, NzCardModule],
  template: `
    <!-- <p>module-list works!</p> -->
    <div nz-row nzAlign="middle" [nzGutter]="[0, 20]" nzJustify="space-around">
      <div nz-col [nzSpan]="22" nzLg="11" *ngFor="let modul of moduls">
        <nz-card nzHoverable [routerLink]="['/home/', modul.route]">
          <h4>
            <b>{{ modul.label }}</b>
          </h4>
        </nz-card>
      </div>
    </div>
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
export class ModuleListComponent {
  public moduls: Array<IModuleItem> = [
    { label: 'Cotizaciones', route: RoutesApp.quotes },
    // { label: 'Ventas', route: RoutesApp.sales },
    { label: 'Productos', route: RoutesApp.products },
    { label: 'Asignaciones', route: RoutesApp.assignments },
    { label: 'Clientes', route: RoutesApp.clients },
    { label: 'Tipos de documentos', route: RoutesApp.documentTypes },
  ];
}
