import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { ProductsService } from '../products.service';
import { RoutesApp } from '../../../../constants';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { IProduct } from '../../../../../interfaces/product.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-products-register',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    GlobalHeaderComponent,
    NzGridModule,
    NzMessageModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzListModule,
  ],
  template: `
    <!-- <p>products-register works!</p> -->
    <app-global-header
      *ngIf="!product"
      [data]="globalHeaderData"
    ></app-global-header>
    <div nz-row nzJustify="center">
      <div nz-col>
        <nz-card>
          <form nz-form [formGroup]="form" (ngSubmit)="submit(form.value)">
            <nz-form-item>
              <nz-form-label nzSpan="24">Nombre del producto</nz-form-label>
              <nz-form-control
                nzHasFeedback
                nzErrorTip="El nombre del producto es requerido"
              >
                <input
                  title="Nombre del producto"
                  nz-input
                  [type]="'text'"
                  [formControlName]="'name'"
                  [placeholder]="'Nombre del producto'"
                />
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label nzSpan="24"
                >Descripción del producto</nz-form-label
              >
              <textarea
                title="Descripción del producto"
                nz-input
                [formControlName]="'description'"
                [placeholder]="'Descripción del producto'"
                [nzAutosize]="{ minRows: 3, maxRows: 6 }"
              ></textarea>
            </nz-form-item>
            <div
              nz-row
              [nzAlign]="'middle'"
              [nzGutter]="[24, 24]"
              [nzJustify]="'space-between'"
              *ngIf="product && product.id"
            >
              <div nz-col>
                <nz-form-item>
                  <nz-form-control nzHasFeedback>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      multiple
                      [placeholder]="'upload files'"
                      id="uploadFiles"
                      (change)="selectedPhotosEvent($event)"
                    />
                    <!-- (change)="spinning = true; selectedPhotosEvent($event)" -->
                    <label for="uploadFiles" class="labelInputUploadFiles">
                      Seleccionar fotos
                    </label>
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>
            <div *ngIf="selectedPhotos.length > 0">
              <nz-list nzHeader="Fotos seleccionadas" nzBordered></nz-list>
              <nz-list class="fileList" nzBordered>
                <nz-list-item
                  *ngFor="let file of selectedPhotos; let i = index"
                >
                  <div
                    nz-row
                    nzAlign="middle"
                    [nzGutter]="[24, 24]"
                    nzJustify="space-between"
                    class="fileListRow"
                  >
                    <div nz-col>
                      <img
                        [src]="file.imageData"
                        [alt]="file.name"
                        title="{{ file.name }}"
                      />
                    </div>
                    <div nz-col>
                      <button
                        type="button"
                        nz-button
                        nzType="text"
                        nzSize="large"
                        nzDanger
                        title="Remover foto"
                        (click)="selectedPhotos.splice(i, 1)"
                      >
                        <span nz-icon nzType="delete"></span>
                      </button>
                    </div>
                  </div>
                </nz-list-item>
              </nz-list>
              <br />
              <button
                type="button"
                title="load"
                nz-button
                nzType="primary"
                (click)="uploadFiles()"
                class="uploadFilesButton"
              >
                <!-- (click)="spinning = true; uploadFiles()" -->
                Cargar Fotos
              </button>
              <br />
            </div>
            <button
              *ngIf="!form.pristine"
              [disabled]="!form.valid"
              type="submit"
              nz-button
              nzType="primary"
            >
              {{ product ? 'Editar' : 'Registrar' }}
            </button>
          </form>
        </nz-card>
      </div>
    </div>
  `,
  styles: [
    `
      #uploadFiles {
        display: none;
      }

      .labelInputUploadFiles {
        background: #171e52;
        border-radius: 3px;
        color: #ffffffff;
        padding: 10px;
      }

      .labelInputUploadFiles:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 0 rgb(196, 196, 196);
      }
      .fileList {
        max-width: 100%;
        max-height: 220px;
        overflow-y: auto;
      }

      .fileList .ant-list-item {
        margin-top: 12px;
        padding: 12px;
      }

      .fileListRow {
        margin: 0 !important;
        width: 100%;
      }

      .fileListRow [nz-col] {
        padding: 0 !important;
      }

      .fileList img {
        max-height: 110px;
      }

      .uploadFilesButton {
        margin-bottom: 24px;
      }
    `,
  ],
})
export class ProductsRegisterComponent implements OnInit {
  globalHeaderData: IGlobalHeaderData = {
    tittle: 'Productos',
    backTo: {
      label: 'Volver a productos',
      route: `${RoutesApp.home}/${RoutesApp.products}`,
    },
  };

  public form: FormGroup = this._fb.group({
    name: [null, [Validators.required]],
    description: [null],
  });

  public product: IProduct | null = null;
  public selectedPhotos: Array<any> = [];

  constructor(
    private _productsSvc: ProductsService,
    private _fb: FormBuilder,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getInputProperties();
    this.product ? this.setIntFormValues(this.product) : false;
  }

  getInputProperties(): void {
    this.product = JSON.parse(localStorage.getItem('product') ?? 'null');
  }

  setIntFormValues(product: IProduct): void {
    this.form.controls['name'].setValue(product.name);
    this.form.controls['description'].setValue(product.description);
  }

  selectedPhotosEvent(event: any) {
    // this.selectedPhotos = event.target.files;
    // this.uploadFiles();
    const invalidFiles: Array<File> = [];
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type.indexOf('image') === -1) {
        invalidFiles.push(event.target.files[i]),
          this._message.error(
            `El archivo con nombre: ${event.target.files[i].name} es invalido por no ser una imagen`
          );
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = () => {
          this.selectedPhotos.push({
            lastModified: event.target.files[i].lastModified,
            lastModifiedDate: event.target.files[i].lastModifiedDate,
            name: event.target.files[i].name,
            size: event.target.files[i].size,
            type: event.target.files[i].type,
            webkitRelativePath: event.target.files[i].webkitRelativePath,
            imageData: reader.result,
          });
        };
      }
    }
    // this.spinning = false;
  }

  uploadFiles() {
    // const photos: Array<string> = [];
    if (this.product && this.product.id) {
      this._productsSvc
        .uploadFile(this.selectedPhotos, {
          ...this.product,
          photos: this.product.photos ?? [],
        })
        .then((productEdited) => {
          this._message.success('El producto fue editado correctamente');
        })
        .catch((error) => {
          console.log({ error });
          this._message.error(
            'Hubo un error por lo que no fue posible editar el producto, por favor vuelva a intentarlo'
          );
        });
      // for (let i = 0; i < this.selectedPhotos.length; i++) {
      //   console.log({
      //     name: Date.now() + '_' + this.selectedPhotos[i].name,
      //     imageData: this.selectedPhotos[i].imageData,
      //   });
      //   // this._productsSvc
      //   //   .uploadFile(
      //   //     Date.now() + '_' + this.selectedPhotos[i].name,
      //   //     this.selectedPhotos[i].imageData
      //   //   )
      //   //   .then((photoUrl) => {
      //   //     // .then((fileResponse) => {
      //   //     console.log({ photoUrl });
      //   //     photoUrl ? photos.push(photoUrl) : false;
      //   //   });
      // }
      // this.submit({ ...this.form.value, photos });
    }
  }

  // submit(productDto: any) {
  submit(product: any) {
    if (this.form.invalid) {
      this._message.warning(
        'El formulario no es valido, por favor rectifique los valores que está ingresando'
      );
      return;
    } else {
      if (this.product && this.product.id) {
        this._productsSvc
          .editProduct(this.product.id, {
            ...product,
            photos: this.product.photos ?? [],
          })
          .then((res) => {
            this._message.success('El producto fue editado correctamente');
          })
          .catch((error) => {
            console.log({ error });
            this._message.error(
              'Hubo un error por lo que no fue posible editar el producto, por favor vuelva a intentarlo'
            );
          });
      } else {
        this._productsSvc
          .registerProduct({ ...product, photos: [] })
          .then((res) => {
            this._message.success('El producto fue registrado correctamente');
            this.form.reset();
          })
          .catch((error) => {
            console.log({ error });
            this._message.error(
              'Hubo un error por lo que no fue posible registrar el producto, por favor vuelva a intentarlo'
            );
          });
      }
    }
  }
}
