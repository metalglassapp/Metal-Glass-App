import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RoutesApp } from '../../../../../../constants';
import { IPulledApartData } from '../../../../../../../interfaces/pulled-apart-data.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-pulled-apart-filter',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzSelectModule,
    NzIconModule,
  ],
  template: `
    <!-- <p>pulled-apart-filter works!</p>  -->

    <form nz-form [formGroup]="findForm">
      <nz-form-item>
        <nz-form-control nzErrorTip="!El acrilico es requerido¡">
          <nz-select
            *ngIf="pulledApartData"
            nzMode="multiple"
            class="Filter"
            nzShowSearch
            formControlName="pulledApart"
            [nzPlaceHolder]="pulledApartData.tittle"
            (ngModelChange)="filt($event)"
          >
            <nz-option
              *ngFor="let pulledApart of pulledAparts"
              [nzValue]="{
                id: pulledApart.id,
                label: pulledApart.name
              }"
              [nzLabel]="pulledApart.name"
            ></nz-option>
          </nz-select>
          <ng-template #selectIcon>
            <span nz-icon nzType="select" nzTheme="outline"></span>
          </ng-template>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: ``,
})
export class PulledApartFilterComponent implements OnInit {
  // @Input() pulledApartData: IPulledApartData | null = {
  //   reference: '',
  //   tittle: '',
  //   pulledAparts: [],
  //   formControl_price: {
  //     label: '',
  //     errorLabel: '',
  //     name: '',
  //     value: null,
  //   },
  // };
  @Input() pulledApartData: IPulledApartData | null = {
    reference: '',
    tittle: '',
    pulledAparts: [],
    formControl_price: {
      label: '',
      errorLabel: '',
      name: '',
      value: null,
    },
  };
  @Input() pulledAparts: Array<any> = [];
  @Output() filtEvent = new EventEmitter<{
    reference: string;
    filtResult: Array<{ id: string; label: string }>;
  }>();

  // findProfileForm = this._fb.group({
  //   profile: [null],
  // });
  findForm = this._fb.group({
    pulledApart: [null],
  });

  public formControlName: string = '';

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.pulledApartData) {
      // this.pulledAparts = this.pulledApartData?.pulledAparts;
      if (this.pulledApartData.tittle === 'Accesorios') {
        this.formControlName = 'accessory';
      }
      if (this.pulledApartData.tittle === 'Perfiles') {
        this.formControlName = 'profile';
      }
      if (this.pulledApartData.tittle === 'Vidrios') {
        this.formControlName = 'vidrio';
      }
      if (this.pulledApartData.tittle === 'Acrilicos') {
        this.formControlName = 'acrilico';
      }
    }
  }

  filt(e: Array<{ id: string; label: string }>): void {
    if (this.pulledApartData?.reference === RoutesApp.accessory) {
      this.filtAccessories(e);
    }
    if (this.pulledApartData?.reference === RoutesApp.acrylic) {
      this.filtAcrylics(e);
    }
    if (this.pulledApartData?.reference === RoutesApp.profile) {
      this.filtProfiles(e);
    }
    if (this.pulledApartData?.reference === RoutesApp.glass) {
      this.filtGlasses(e);
    }
  }

  filtProfiles(e: Array<{ id: string; label: string }>): void {
    if (this.pulledApartData?.reference) {
      this.filtEvent.emit({
        reference: this.pulledApartData.reference,
        filtResult: e,
      });
    }
  }

  filtAcrylics(e: Array<{ id: string; label: string }>): void {
    if (this.pulledApartData?.reference) {
      this.filtEvent.emit({
        reference: this.pulledApartData.reference,
        filtResult: e,
      });
    }
  }

  filtGlasses(e: Array<{ id: string; label: string }>): void {
    if (this.pulledApartData?.reference) {
      this.filtEvent.emit({
        reference: this.pulledApartData.reference,
        filtResult: e,
      });
    }
  }

  filtAccessories(e: Array<{ id: string; label: string }>): void {
    if (this.pulledApartData?.reference) {
      this.filtEvent.emit({
        reference: this.pulledApartData.reference,
        filtResult: e,
      });
    }
  }
}
