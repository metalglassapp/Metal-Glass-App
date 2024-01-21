import { Component, OnInit } from '@angular/core';
import { IPulledApartData } from '../../../../../../interfaces/pulled-apart-data.interface';
import { RoutesApp } from '../../../../../constants';
import { QuotesService } from '../../quotes.service';
import { NgFor } from '@angular/common';
import { ModuleItemComponent } from './module-item/module-item.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-modules-list',
  standalone: true,
  imports: [NgFor, ModuleItemComponent, NzGridModule],
  template: ` <div
    nz-row
    nzAlign="middle"
    [nzGutter]="[0, 20]"
    nzJustify="space-between"
  >
    <div
      nz-col
      [nzSpan]="5"
      [nzXXl]="5"
      [nzXl]="5"
      [nzLg]="5"
      [nzMd]="11"
      [nzSm]="22"
      [nzXs]="22"
      *ngFor="let modul of moduls"
    >
      <app-module-item [modul]="modul"></app-module-item>
    </div>
  </div>`,
  styles: [``],
})
export class ModulesListComponent implements OnInit {
  public moduls: Array<{
    label: string;
    route: string;
    pulledApartData: IPulledApartData | null;
  }> = [
    {
      label: 'Accesorios',
      route: RoutesApp.accessories,
      pulledApartData: null,
    },
    { label: 'Perfiles', route: RoutesApp.profiles, pulledApartData: null },
    { label: 'Vidrios', route: RoutesApp.glasses, pulledApartData: null },
    { label: 'acrilicos', route: RoutesApp.acrylics, pulledApartData: null },
  ];
  constructor(private _quotesSvc: QuotesService) {}

  ngOnInit(): void {
    this.pulledApartDataLoad();
  }

  pulledApartDataLoad(): void {
    this.moduls.forEach((modul) => {
      if (modul.route === RoutesApp.accessories) {
        this._quotesSvc.getAccessories().subscribe(
          (accessories) => {
            modul.pulledApartData = {
              reference: RoutesApp.accessory,
              tittle: 'Accesorios',
              pulledAparts: accessories,
              formControl_price: {
                label: 'Precio por unidad',
                errorLabel: 'El Precio por unidad es requerido',
                name: 'price',
                value: null,
              },
            };
          },
          (error) => console.log({ error })
        );
      }
      if (modul.route === RoutesApp.profiles) {
        this._quotesSvc.getProfiles().subscribe(
          (profiles) => {
            modul.pulledApartData = {
              reference: RoutesApp.profile,
              tittle: 'Perfiles',
              pulledAparts: profiles,
              formControl_price: {
                label: 'Precio por metro',
                errorLabel: 'El precio por metro es requerido',
                name: 'pricePerMeter',
                value: null,
              },
            };
          },
          (error) => console.log({ error })
        );
      }
      if (modul.route === RoutesApp.glasses) {
        this._quotesSvc.getGlasses().subscribe(
          (glasses) => {
            modul.pulledApartData = {
              reference: RoutesApp.glass,
              tittle: 'Vidrios',
              pulledAparts: glasses,
              formControl_price: {
                label: 'Precio por metro cuadrado',
                errorLabel: 'El precio por metro cuadrado es requerido',
                name: 'pricePerSquareMeter',
                value: null,
              },
            };
          },
          (error) => console.log({ error })
        );
      }
      if (modul.route === RoutesApp.acrylics) {
        this._quotesSvc.getAcrylics().subscribe(
          (acrylics) => {
            modul.pulledApartData = {
              reference: RoutesApp.acrylic,
              tittle: 'Acrilicos',
              pulledAparts: acrylics,
              formControl_price: {
                label: 'Precio por metro cuadrado',
                errorLabel: 'El precio por metro cuadrado es requerido',
                name: 'pricePerSquareMeter',
                value: null,
              },
            };
          },
          (error) => console.log({ error })
        );
      }
    });
  }
}
