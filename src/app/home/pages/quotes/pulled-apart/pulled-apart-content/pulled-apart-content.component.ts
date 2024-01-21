import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalHeaderComponent } from '../../../../global-header/global-header.component';
import { PulledApartFilterComponent } from '../components/pulled-apart-filter/pulled-apart-filter.component';
import { PulledApartListItemComponent } from '../components/pulled-apart-list-item/pulled-apart-list-item.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IPulledApart } from '../../../../../../interfaces/pulled-apart.interface';
import { IPulledApartData } from '../../../../../../interfaces/pulled-apart-data.interface';
import { IDataForm } from '../../../../../../interfaces/form-data.interface';
import { RoutesApp } from '../../../../../constants';

@Component({
  selector: 'app-pulled-apart-content',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    GlobalHeaderComponent,
    PulledApartFilterComponent,
    PulledApartListItemComponent,
    NzGridModule,
    NzButtonModule,
  ],
  template: `
    <!-- <p>pulled-apart-content works!</p>  -->
    <div *ngIf="pulledApartData">
      <app-global-header
        [data]="{
          tittle: pulledApartData.tittle,
          backTo: {
            label: 'Volver a Cotizaciones',
            route: '/home/cotizaciones'
          }
        }"
      ></app-global-header>
      <div
        nz-row
        nzAlign="middle"
        [nzGutter]="[0, 24]"
        nzJustify="space-between"
        class="filt-register"
      >
        <div
          nz-col
          [nzXXl]="12"
          [nzXl]="12"
          [nzLg]="15"
          [nzMd]="15"
          [nzSm]="22"
          [nzXs]="22"
        >
          <app-pulled-apart-filter
            [pulledApartData]="pulledApartData"
            (filtEvent)="filt($event)"
            [pulledAparts]="pulledAparts"
          ></app-pulled-apart-filter>
        </div>
        <div nz-col>
          <button
            type="button"
            nz-button
            nzType="primary"
            class="pulled-apartRegisterButton"
            (click)="registerFunction()"
          >
            <!-- [routerLink]="['/admin/home/acrilicos/registro-acrilico']" -->
            Registrar {{ pulledApartData.tittle }}
          </button>
        </div>
      </div>
      <div
        nz-row
        nzAlign="middle"
        [nzGutter]="[24, 24]"
        nzJustify="space-around"
      >
        <div nz-col *ngFor="let pulledApart of pulledApartsView">
          <app-pulled-apart-list-item
            [pulledApart]="pulledApart"
            [dataForm]="dataForm"
            [reference]="dataForm.reference"
            (postAcrilics)="postPulledAparts($event)"
          ></app-pulled-apart-list-item>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .filt-register {
        padding: 0 24px;
      }

      nz-form-control,
      .acrylicFilter {
        width: 100%;
      }
    `,
  ],
})
export class PulledApartContentComponent implements OnInit {
  public pulledAparts: IPulledApart[] | any = [];
  public pulledApartsView: IPulledApart[] | any = [];
  public pulledApartData: IPulledApartData | null = null;

  public dataForm: IDataForm | any | null = null;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.dataLoad();
    this.dataForm = {
      reference: this.pulledApartData?.reference,
      formControl_name: {
        label: 'Nombre del ' + this.pulledApartData?.reference,
        errorLabel:
          'El nombre del ' +
          this.pulledApartData?.reference +
          ' es rerequerido',
        name: 'name',
        value: null,
      },
      formControl_price: {
        label: this.pulledApartData?.formControl_price.label,
        errorLabel: this.pulledApartData?.formControl_price.errorLabel,
        name: this.pulledApartData?.formControl_price.name,
        value: this.pulledApartData?.formControl_price.value,
      },
    };
  }

  dataLoad(): void {
    const pulledApartData = localStorage.getItem('pulledApartData');
    if (pulledApartData) {
      const pulledApartDataParse: IPulledApartData =
        JSON.parse(pulledApartData);
      this.pulledApartData = pulledApartDataParse;
      this.pulledAparts = this.pulledApartData.pulledAparts;
      this.pulledApartsView = this.pulledAparts;
    }
  }

  // filtpulledAparts(e: any) {
  filt(e: any) {
    if (e.filtResult.length > 0) {
      this.pulledApartsView = [];
      // e.forEach((emplItem) => {
      e.filtResult.forEach((emplItem: any) => {
        this.pulledAparts.forEach((pulledApart: any) => {
          if (pulledApart.id === emplItem.id) {
            this.pulledApartsView.push(pulledApart);
          }
        });
      });
    } else {
      this.pulledApartsView = this.pulledAparts;
    }
  }

  deleteAcrylic(acrylicId: string): void {}

  registerFunction(): void {
    localStorage.removeItem('dataForm');
    localStorage.setItem('dataForm', JSON.stringify(this.dataForm));
    if (this.pulledApartData?.reference === 'perfil') {
      this._router.navigate([
        `${RoutesApp.home}/${this.pulledApartData?.reference}es/registro-${this.pulledApartData?.reference}`,
      ]);
    } else {
      this._router.navigate([
        `${RoutesApp.home}/${this.pulledApartData?.reference}s/registro-${this.pulledApartData?.reference}`,
      ]);
    }
  }

  cancel(): void {}

  confirm(acrylicId: string): void {
    this.deleteAcrylic(acrylicId);
  }

  postPulledAparts(pulledAparts: any): void {
    this.pulledAparts = pulledAparts;
    this.pulledApartsView = pulledAparts;
    if (this.pulledApartData) {
      this.pulledApartData.pulledAparts = pulledAparts;
      localStorage.removeItem('pulledApartData');
      localStorage.setItem(
        'pulledApartData',
        JSON.stringify(this.pulledApartData)
      );
    }
    // pulledApartData;
  }
}
