import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { RoutesApp } from '../../../../constants';
import { TypesOfDocumentsService } from '../types-of-documents.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ITypeDocument } from '../../../../../interfaces/type-document.interface';
import { RegisterDocumentTypeComponent } from '../register-document-type/register-document-type.component';

@Component({
  selector: 'app-types-of-documents-content',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    JsonPipe,
    GlobalHeaderComponent,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzAlertModule,
    NzIconModule,
    NzModalModule,
  ],
  providers: [NzModalService],
  template: `
    <!-- <p>types-of-documents-content works!</p> -->
    <app-global-header [data]="globalHeaderData"></app-global-header>
    <div nz-row nzAlign="middle" nzJustify="end" class="row1">
      <button nz-button nzType="primary" (click)="registerAction()">
        <!-- [routerLink]="['/home/tipos-de-documentos/registro-tipo-de-documento']" -->
        Registrar tipo de documento
      </button>
    </div>
    <div
      nz-row
      nzAlign="top"
      [nzGutter]="[24, 24]"
      nzJustify="space-evenly"
      class="row2"
    >
      <div nz-col *ngFor="let typeDocument of typesDoc; let i = index">
        <nz-card
          nzHoverable
          [nzActions]="[EditSectionAction, DeleteSectionAction]"
        >
          <nz-card-meta
            [nzTitle]="typeDocument.type"
            [nzDescription]="
              typeDocument.description ? typeDocument.description : ''
            "
          ></nz-card-meta>
        </nz-card>
        <ng-template #EditSectionAction>
          <span
            nz-icon
            nzType="edit"
            nzTheme="outline"
            (click)="showEditDocumentType(typeDocument, i)"
          ></span>
        </ng-template>
        <ng-template #DeleteSectionAction>
          <!-- (click)="delete(typeDocument.id ?? '', i)" -->
          <span
            nz-icon
            nzType="delete"
            nzTheme="outline"
            (click)="
              typeOfDocumentPerDelete = typeDocument;
              typeOfDocumentPerDeletePositon = i
            "
          ></span>
        </ng-template>
      </div>
    </div>
    <div nz-col [nzSpan]="22" *ngIf="typeOfDocumentPerDelete">
      <nz-alert
        nzShowIcon
        nzType="warning"
        nzMessage="¿Seguro?"
        [nzDescription]="descriptionTemplate2"
      ></nz-alert>
      <ng-template #descriptionTemplate2>
        <!-- <p>Info Description Info Description Info Description Info Description</p> -->
        <p>Seguro de eliminar a {{ typeOfDocumentPerDelete.type }}</p>
        <div nz-row nzAlign="middle" [nzGutter]="[24, 24]" nzJustify="end">
          <div nz-col>
            <button
              nz-button
              nzType="primary"
              nzDanger
              (click)="delete(typeOfDocumentPerDelete.id ?? '')"
            >
              Eliminar
            </button>
          </div>
          <div nz-col>
            <button
              nz-button
              nzType="primary"
              (click)="
                typeOfDocumentPerDelete = null;
                typeOfDocumentPerDeletePositon = null
              "
            >
              Mejor no
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: `nz-card {
  width: 300px;
  /* min-height: 140px; */
  min-height: 100%;
  background: rgb(253, 253, 253);
}

.row1 {
  padding-right: 24px;
}

.row2 {
  padding: 24px;
}
`,
})
export class TypesOfDocumentsContentComponent implements OnInit {
  public globalHeaderData: IGlobalHeaderData = {
    tittle: 'Tipos de documentos',
    backTo: { label: 'Volver a Home', route: RoutesApp.home },
  };
  // public typesDocuments: ITypeDocument[] = [];
  // public typeOfDocumentPerDelete: ITypeDocument | null = null;
  // public typeOfDocumentPerDeletePositon: number | null = null;
  public typesDocuments: any[] = [];
  public typeOfDocumentPerDelete: any | null = null;
  public typeOfDocumentPerDeletePositon: number | null = null;

  get typesDoc() {
    return this.typesDocuments;
  }

  constructor(
    private _typesDocumentsSvc: TypesOfDocumentsService,
    private _message: NzMessageService,
    private _modal: NzModalService,
    private _router: Router
  ) {
    // localStorage.setItem('spinning', 'true');
  }

  ngOnInit(): void {
    this.getDocumentTypes();
    localStorage.removeItem('documentType');
  }

  getDocumentTypes(): void {
    this._typesDocumentsSvc.getDocumentTypes().subscribe(
      (typesDocuments) => {
        this.typesDocuments = typesDocuments;
      },
      (err) => {
        console.log({ error: err });
      }
    );
  }

  // showEditDocumentType(typeDocument: ITypeDocument, i: number): void {
  showEditDocumentType(documentType: ITypeDocument, i: number): void {
    // showEditDocumentType(typeDocument: any, i: number): void {
    const typeOfDocumentRegisterComponent = this._modal.info({
      nzTitle: `Editar a ${documentType.type}`,
      nzIconType: 'edit',
      nzContent: RegisterDocumentTypeComponent,
      // nzComponentParams: { documentType: documentType },
      // nzData: { documentType: typeDocument },
      // nzData: documentType,
      nzWidth: '90%',
    });
    localStorage.setItem('documentType', JSON.stringify(documentType));
    // typeOfDocumentRegisterComponent.afterOpen.subscribe(() => {
    //   this._typesDocumentsSvc.setTypeDocument(typeDocument);
    // });
    typeOfDocumentRegisterComponent.componentInstance?.documentTypeEmitter.subscribe(
      (next) => {
        this.typesDocuments.splice(i, 1, next);
      }
    );
  }

  delete(id: string): void {
    this._typesDocumentsSvc
      .deleteDocumentType(id)
      .then((res) => {
        this._message.success('Eliminado correctamente');
      })
      .catch((error) => {
        console.log({ error });
        this._message.error(
          'No fue posible eliminar el tipo de documento, por favor vuelva a intentarlo'
        );
      });
    this.typeOfDocumentPerDelete = null;
    this.typeOfDocumentPerDeletePositon = null;
  }

  registerAction(): void {
    // this._typesDocumentsSvc.typeDocument = null;
    localStorage.removeItem('documentType');
    this._router.navigate([
      `${RoutesApp.home}/${RoutesApp.documentTypes}/${RoutesApp.documentTypeRegister}`,
    ]);
  }
}
