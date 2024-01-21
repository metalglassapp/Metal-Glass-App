import { DecimalPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormComponent } from '../../form/form.component';
import { PulledApartService } from '../../pulled-apart.service';
import { QuotesService } from '../../../quotes.service';
import { RoutesApp } from '../../../../../../constants';
import { IPulledApart } from '../../../../../../../interfaces/pulled-apart.interface';
import { IDataForm } from '../../../../../../../interfaces/form-data.interface';
import { IAccessory } from '../../../../../../../interfaces/accessory.interface';
import { IProfile } from '../../../../../../../interfaces/profile.interface';
import { IGlass } from '../../../../../../../interfaces/glass.interface';
import { IAcrylic } from '../../../../../../../interfaces/acrylic.interface';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-pulled-apart-list-item',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzIconModule,
  ],
  template: `
    <!-- <p>pulled-apart-list-item works!</p>  -->
    <nz-card
      nzHoverable
      [nzActions]="[pulledApartEdit, pulledApartDelete]"
      *ngIf="pulledApart"
    >
      <p>
        Nombre: <b>{{ pulledApart.name }}</b>
      </p>
      <p>
        Precio: <b>{{ price | number }}</b>
      </p>
      <ng-template #pulledApartEdit>
        <span
          nz-icon
          nzType="edit"
          nzTheme="outline"
          *ngIf="pulledApart"
          (click)="showpulledApartEditView(pulledApart)"
        ></span>
      </ng-template>
      <ng-template #pulledApartDelete>
        <a
          nz-button
          nzType="link"
          nzDanger
          *ngIf="pulledApart.id && dataForm"
          nz-popconfirm
          [nzPopconfirmTitle]="
            '¿Esta seguro de elimanar este ' + dataForm.reference + '?'
          "
          nzPopconfirmPlacement="bottom"
          (nzOnConfirm)="confirm(pulledApart.id)"
          (nzOnCancel)="cancel()"
          nzCancelText="Mejor no"
          nzOkText="Sí, estoy seguro"
          ><span nz-icon nzType="delete" nzTheme="outline"></span
        ></a>
      </ng-template>
    </nz-card>
  `,
  styles: ``,
})
export class PulledApartListItemComponent implements OnInit {
  @Input() pulledApart: IPulledApart | null = null;
  // @Input() pulledApart:
  //   | IProfile
  //   | IAcrylic
  //   | IAccessory
  //   | IGlass
  //   | null = null;
  @Input() dataForm: IDataForm | null = null;
  @Input() reference: string = '';
  @Output() postAcrilics = new EventEmitter<
    Array<IAccessory> | Array<IProfile> | Array<IGlass> | Array<IAcrylic>
  >();
  // @Output() postAcrilics = new EventEmitter<IPulledApart>();

  public price: number = 0;

  constructor(
    private _modalService: NzModalService,
    private _pulledApartSvc: PulledApartService,
    private _quotesSvc: QuotesService
  ) {}

  ngOnInit(): void {
    if (this.pulledApart && this.pulledApart.price) {
      this.price = this.pulledApart.price;
    }
    if (this.pulledApart && this.pulledApart.pricePerMeter) {
      this.price = this.pulledApart.pricePerMeter;
    }
    if (this.pulledApart && this.pulledApart.pricePerSquareMeter) {
      this.price = this.pulledApart.pricePerSquareMeter;
    }
  }

  showpulledApartEditView(pulledApart: IPulledApart): void {
    if (this.dataForm) {
      this.dataForm.referenceId = pulledApart.id;
      this.dataForm.formControl_name.value = pulledApart.name;
      // this.dataForm.formControl_price.value = pulledApart.pricePerMeter;
      if (pulledApart.price) {
        this.dataForm.formControl_price.value = pulledApart.price;
      }
      if (pulledApart.pricePerMeter) {
        this.dataForm.formControl_price.value = pulledApart.pricePerMeter;
      }
      if (pulledApart.pricePerSquareMeter) {
        this.dataForm.formControl_price.value = pulledApart.pricePerSquareMeter;
      }
      const dataForm = this.dataForm;
      this._modalService.info({
        nzTitle: 'Editar Perfil',
        // nzContent: pulledApartEditComponent,
        nzContent: FormComponent,
        nzWidth: '90%',
        // nzComponentParams: { dataForm },
        nzIconType: 'edit',
        nzOnOk: () => this.getpulledApart(),
        nzOnCancel: () => this.getpulledApart(),
      });
      localStorage.setItem('dataForm', JSON.stringify(dataForm));
    }
  }

  getpulledApart(): void {
    if (this.pulledApart?.id) {
      if (this.reference === RoutesApp.accessory) {
        this._quotesSvc.getAccessories().subscribe(
          (accessories) => {
            this.postAcrilics.emit(accessories);
          },
          (error) => console.log({ error })
        );
      }
      if (this.reference === RoutesApp.profile) {
        this._quotesSvc.getProfiles().subscribe(
          (profiles) => {
            this.postAcrilics.emit(profiles);
          },
          (error) => console.log({ error })
        );
      }
      if (this.reference === RoutesApp.glass) {
        this._quotesSvc.getGlasses().subscribe(
          (glasses) => {
            this.postAcrilics.emit(glasses);
          },
          (error) => console.log({ error })
        );
      }
      if (this.reference === RoutesApp.acrylic) {
        this._quotesSvc.getAcrylics().subscribe(
          (acrylics) => {
            this.postAcrilics.emit(acrylics);
          },
          (error) => console.log({ error })
        );
      }
    }
  }

  cancel(): void {}

  confirm(pulledApartId: string): void {
    this.deletePulledApart(pulledApartId);
  }

  deletePulledApart(pulledApartId: string): void {
    if (this.reference === RoutesApp.accessory) {
      this._pulledApartSvc
        .deleteAccessory(pulledApartId)
        .then((postDeleted) => {
          this.getpulledApart();
        })
        .catch((error) => console.log({ error }));
    }
    if (this.reference === RoutesApp.profile) {
      this._pulledApartSvc
        .deleteProfile(pulledApartId)
        .then((postDeleted) => {
          this.getpulledApart();
        })
        .catch((error) => console.log({ error }));
    }
    if (this.reference === RoutesApp.glass) {
      this._pulledApartSvc
        .deleteGlass(pulledApartId)
        .then((postDeleted) => {
          this.getpulledApart();
        })
        .catch((error) => console.log({ error }));
    }
    if (this.reference === RoutesApp.acrylic) {
      this._pulledApartSvc
        .deleteAcrylic(pulledApartId)
        .then((postDeleted) => {
          this.getpulledApart();
        })
        .catch((error) => console.log({ error }));
    }
  }
}
