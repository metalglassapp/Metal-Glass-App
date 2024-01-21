import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ITypeDocument } from '../../../../../interfaces/type-document.interface';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { RoutesApp } from '../../../../constants';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypesOfDocumentsService } from '../types-of-documents.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-register-document-type',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    GlobalHeaderComponent,
    NzGridModule,
    NzCardModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
  template: `
    <!-- <p>
      register-document-type works!
    </p> -->
    <app-global-header
      [data]="globalHeaderData"
      *ngIf="!documentType"
    ></app-global-header>
    <div
      nz-row
      nzAlign="middle"
      [nzGutter]="[0, 0]"
      nzJustify="center"
      class="content-row"
    >
      <div nz-col nzSpan="22" class="content-col">
        <nz-card *ngIf="!documentType; else form">
          <div *ngIf="documentType; else form"></div>
        </nz-card>
        <ng-template #form>
          <nz-spin
            [nzTip]="'Cargando...'"
            [nzSpinning]="spinning"
            [nzSize]="'large'"
          >
            <form
              nz-form
              [formGroup]="registerTypeDocumentForm"
              (ngSubmit)="
                documentType && documentType.id
                  ? editTypeDocument(documentType)
                  : registerTypeDocument()
              "
            >
              <div
                nz-row
                [nzAlign]="'top'"
                [nzGutter]="[24, 24]"
                [nzJustify]="'space-between'"
              >
                <div nz-col [nzSpan]="24" [nzMd]="12">
                  <nz-form-item>
                    <nz-form-label nzSpan="24"
                      >Nombre del tipo de documento</nz-form-label
                    >
                    <nz-form-control
                      nzHasFeedback
                      nzErrorTip="El nombre del documento es requerido"
                    >
                      <input
                        nz-input
                        formControlName="type"
                        placeholder="Nombre"
                      />
                    </nz-form-control>
                  </nz-form-item>
                </div>
                <div nz-col [nzSpan]="24" [nzMd]="12">
                  <nz-form-item>
                    <nz-form-label nzSpan="24"
                      >Descripción del tipo de documento</nz-form-label
                    >
                    <textarea
                      nz-input
                      [formControlName]="'description'"
                      [placeholder]="'Descripción'"
                      [nzAutosize]="{ minRows: 3, maxRows: 6 }"
                    ></textarea>
                  </nz-form-item>
                </div>
              </div>
              <div
                nz-row
                [nzJustify]="'end'"
                *ngIf="!registerTypeDocumentForm.pristine"
              >
                <div nz-col>
                  <button
                    nz-button
                    type="submit"
                    nzType="primary"
                    [disabled]="!registerTypeDocumentForm.valid"
                  >
                    {{ documentType ? 'Editar' : 'Registrar' }}
                  </button>
                </div>
              </div>
            </form>
          </nz-spin>
        </ng-template>
      </div>
    </div>
  `,
  styles: `nz-card {
  box-shadow: 2px 2px 10px gray;
}
`,
})
export class RegisterDocumentTypeComponent implements OnInit {
  @Output() documentTypeEmitter: EventEmitter<ITypeDocument> =
    new EventEmitter();
  // @Input() documentType: ITypeDocument | null = null;

  public documentType: ITypeDocument | null = null;

  public globalHeaderData: IGlobalHeaderData = {
    tittle: 'Registrar tipo de documento',
    backTo: {
      label: 'Volver a Documentos',
      route: `${RoutesApp.home}/${RoutesApp.documentTypes}`,
    },
  };

  public registerTypeDocumentForm = this._fb.group({
    type: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(80)],
    ],
    description: ['', [Validators.maxLength(300)]],
  });

  public spinning: boolean = false;

  constructor(
    // @Inject(NZ_MODAL_DATA) public documentType: ITypeDocument,
    private _fb: FormBuilder,
    private _typesDocumentsSvc: TypesOfDocumentsService,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    // this._typesDocumentsSvc.typeDocument$.subscribe((typeDocument) => {
    //   this.documentType = typeDocument;
    // });
    // setTimeout(() => {
    //   this.documentType ? this.initForm(this.documentType) : false;
    //   this.spinning = false;
    // }, 1000);
    const documentType = localStorage.getItem('documentType');
    documentType
      ? (this.documentType = JSON.parse(documentType))
      : (this.documentType = null);
    this.spinning = true;
    if (this.documentType) {
      this.initForm(this.documentType);
    }
    this.spinning = false;
  }

  initForm(documentType: ITypeDocument): void {
    this.registerTypeDocumentForm.controls['type'].setValue(documentType.type);
    this.registerTypeDocumentForm.controls['description'].setValue(
      documentType.description ? documentType.description : ''
    );
  }

  async registerTypeDocument(): Promise<void> {
    if (!this.registerTypeDocumentForm.valid) {
      this._message.error('El formulario no es valido');
      return;
    }
    await this._typesDocumentsSvc
      .registerDocumentType(this.registerTypeDocumentForm.value)
      .then((res) => {
        this._message.success(
          `Tipo de documento: ${this.registerTypeDocumentForm.value.type}, ha sido registrado correctamente`
        );
        this.registerTypeDocumentForm.reset();
      })
      .catch((error) => {
        console.log({ error });
        this._message.error(
          `No se pudo registrar el tipo de documento '${this.registerTypeDocumentForm.value.type}', por favor vuelva a intentarlo`
        );
      });
  }

  // editTypeDocument(documentTypeId: string): void {
  editTypeDocument(documentType: ITypeDocument): void {
    if (!this.registerTypeDocumentForm.valid) {
      this._message.error('El formulario no es valido');
      return;
    }
    this.spinning = true;
    // this._typesDocumentsSvc
    //   .editDocumentType(documentTypeId, {
    //     ...this.registerTypeDocumentForm.value,
    //   })
    //   .subscribe(
    //     (documentTypePostEdited) => {
    //       this.documentTypeEmitter.emit(documentTypePostEdited);
    //       this.spinning = false;
    //       this._message.success('Tipo de Documento editado correctamento');
    //     },
    //     (error) => {
    //       this.spinning = false;
    //       this._message.error(
    //         'Algo fallo editando el Tipo de Documento, por favor vuelva a intentarlo'
    //       );
    //     }
    //   );
    this._typesDocumentsSvc
      .editDocumentType(documentType.id ?? '', {
        ...this.registerTypeDocumentForm.value,
      })
      .then((res) => {
        this._message.success(
          `El tipo de documento '${documentType.type}', ha sido editado correcta mente`
        );
      })
      .catch((error) => {
        console.log({ error });
        this._message.success(
          `Hubo un error y no fue posible editar el tipo de documento '${documentType.type}', Por favor vuelva a intentarlo`
        );
      });
    this.spinning = false;
  }
}
