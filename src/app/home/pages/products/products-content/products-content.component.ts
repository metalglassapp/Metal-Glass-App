import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { ProductsRegisterComponent } from '../products-register/products-register.component';
import { ProductsService } from '../products.service';
import { RoutesApp } from '../../../../constants';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { IProduct } from '../../../../../interfaces/product.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { IPhoto } from '../../../../../interfaces/photo.interface';
import { PhotosViewComponent } from '../photos-view/photos-view.component';

@Component({
  selector: 'app-products-content',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    ReactiveFormsModule,
    GlobalHeaderComponent,
    NzGridModule,
    NzFormModule,
    NzSelectModule,
    NzTableModule,
    NzButtonModule,
    NzSpinModule,
    NzModalModule,
    NzIconModule,
    NzAlertModule,
    NzMessageModule,
  ],
  template: `
    <!-- <p>
      products-content works!
    </p> -->
    <nz-spin [nzTip]="'Cargando...'" [nzSpinning]="spinning"></nz-spin>

    <app-global-header [data]="globalHeaderData"></app-global-header>
    <div nz-row nzAlign="middle" [nzGutter]="24" nzJustify="center">
      <div nz-col [nzSpan]="24">
        <div nz-row [nzGutter]="24" nzJustify="end" class="registerClass">
          <div nz-col>
            <button
              type="button"
              nz-button
              nzType="primary"
              [routerLink]="['/home/productos/registro-producto']"
            >
              Registrar producto
            </button>
          </div>
        </div>
      </div>
      <div nz-col [nzSpan]="22" [nzLg]="16">
        <!-- <div nz-row [nzGutter]="24" nzAlign="middle" nzJustify="center">
          <div nz-col nzSpan="22"></div>
        </div> -->
        <nz-table #basicTable [nzData]="products" [nzScroll]="{ x: '99%' }">
          <thead>
            <tr>
              <th nzWidth="180px">
                Nombre
                <form nz-form [formGroup]="filterForm">
                  <div nz-row nzAlign="middle" nzJustify="space-between">
                    <div nz-col nzSpan="22">
                      <nz-select
                        type="text"
                        title="Nombre"
                        formControlName="name"
                        nzPlaceHolder="Nombre"
                        (ngModelChange)="filter()"
                        nzMode="default"
                      >
                        <nz-option
                          *ngFor="let name of productsNames"
                          [nzValue]="name"
                          [nzLabel]="name"
                        ></nz-option>
                      </nz-select>
                    </div>
                    <div nz-col nzSpan="2">
                      <button
                        title="restear"
                        type="button"
                        nz-button
                        nzType="primary"
                        (click)="filterForm.reset(); getProducts()"
                      >
                        <span nz-icon nzType="reload"></span>
                      </button>
                    </div>
                  </div>
                </form>
              </th>
              <th nzWidth="180px">Descripción</th>
              <th nzWidth="180px">Imagenes</th>
              <th nzWidth="120px">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of basicTable.data; let i = index">
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>
                <div class="scrollProductPhotos">
                  <div nz-row nzAlign="middle" nzJustify="center">
                    <div nz-col>
                      <!-- <nz-card> -->
                      <img
                        *ngFor="let photo of product.photos"
                        [src]="photo.url"
                        [alt]="'Foto de ' + product.name"
                        [title]="photo.name"
                        (click)="showPhotoView(photo)"
                      />
                      <!-- </nz-card> -->
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div nz-row nzJustify="space-evenly">
                  <div nz-col>
                    <button
                      nz-button
                      nzType="primary"
                      nzShape="circle"
                      title="Ver"
                      type="button"
                      (click)="editProduct(product.id ?? '', product)"
                    >
                      <span nz-icon nzType="eye" title="Editar"></span>
                    </button>
                  </div>
                  <div nz-col>
                    <a
                      nz-button
                      nzType="link"
                      nzType="primary"
                      nzShape="circle"
                      nzDanger
                      title="Eliminar"
                      nz-popover
                      (click)="
                        productPerDelete = product; productPerDeletePositon = i
                      "
                    >
                      <span nz-icon nzType="delete" title="Eliminar"></span
                    ></a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </div>
    </div>
    <div nz-row *ngIf="productPerDelete" nzJustify="center">
      <div nz-col [nzSpan]="22">
        <nz-alert
          nzShowIcon
          nzType="warning"
          nzMessage="¿Seguro?"
          [nzDescription]="descriptionTemplate2"
        ></nz-alert>
        <ng-template #descriptionTemplate2>
          <!-- <p>Info Description Info Description Info Description Info Description</p> -->
          <p>Seguro de eliminar a {{ productPerDelete.name }}</p>
          <div nz-row nzAlign="middle" [nzGutter]="[24, 24]" nzJustify="end">
            <div nz-col>
              <button
                nz-button
                nzType="primary"
                nzDanger
                (click)="deleteProduct(productPerDelete)"
              >
                <!-- (click)="deleteProduct(productPerDelete.id ?? '')" -->
                Eliminar
              </button>
            </div>
            <div nz-col>
              <button
                nz-button
                nzType="primary"
                (click)="
                  productPerDelete = null; productPerDeletePositon = null
                "
              >
                Mejor no
              </button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
      }

      nz-alert {
        margin-top: 24px;
      }

      .scrollProductPhotos {
        overflow-y: scroll;
        height: 100px;
        width: 100%;
        justify-content: center;
        text-align: center;
        background: #cccccc23;
      }

      .scrollProductPhotos img {
        width: 98%;
        margin: 1px 0;
      }

      .scrollProductPhotos img:hover {
        cursor: pointer;
        transform: scale(1.01);
        margin: 2px 0;
        border: solid 2px #7095fcd7;
      }

      .registerClass {
        padding-right: 24px;
        margin-bottom: 24px;
      }
    `,
  ],
})
export class ProductsContentComponent implements OnInit, OnDestroy {
  globalHeaderData: IGlobalHeaderData = {
    tittle: 'Productos',
    backTo: { label: 'Volver a home', route: RoutesApp.home },
  };

  public filterForm: FormGroup = this._fb.group({
    name: [null],
  });

  public products: Array<IProduct> = [];
  public productsNames: Array<string> = [];
  public spinning: boolean = false;
  public nzPopoverVisible: boolean = false;

  public productPerDelete: any | null = null;
  public productPerDeletePositon: number | null = null;

  constructor(
    private _productsSvc: ProductsService,
    private _fb: FormBuilder,
    private _modal: NzModalService,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.spinning = true;
    this.productsNames = [];
    this._productsSvc.getProducts().subscribe(
      (res) => {
        this.products = res;
        this.productsNames = [];
        res.forEach((product) => {
          this.productsNames.push(product.name);
        });
      },
      (error) => console.log({ error })
    );
    this.spinning = false;
  }

  editProduct(id: string, productDto: any): void {
    this._modal.info({
      nzIconType: 'edit',
      nzContent: ProductsRegisterComponent,
      nzWidth: '90%',
    });
    localStorage.setItem('product', JSON.stringify(productDto));
  }

  deleteProduct(product: IProduct): void {
    product.photos.forEach((photo) => {
      this._productsSvc
        .deletePhoto(`${photo.collection}/${photo.name}`)
        .then(() => {});
    });
    product.id
      ? (this._productsSvc
          .deleteProduct(product.id)
          .then((res) => {
            this._message.success('Eliminado correctamente');
          })
          .catch((error) => {
            console.log({ error });
            this._message.error(
              'No fue posible eliminar el producto, por favor vuelva a intentarlo'
            );
          }),
        (this.productPerDelete = null),
        (this.productPerDeletePositon = null))
      : false;
  }

  filter(): void {
    if (this.filterForm.controls['name'].value) {
      this.filterForm.controls['name'].value.length > 0
        ? this._productsSvc
            .filter(this.filterForm.controls['name'].value)
            .then((res) => {
              this.products = res;
            })
            .catch((error) => console.log({ error }))
        : this.getProducts();
    }
  }

  showPhotoView(photo: IPhoto): void {
    const photosViewComponent = this._modal.info({
      nzIconType: 'eye',
      nzContent: PhotosViewComponent,
      nzWidth: '90%',
    });
    // localStorage.setItem('photos', JSON.stringify(photos));
    localStorage.setItem('photo', JSON.stringify(photo));
    photosViewComponent.componentInstance?.deletePhotoEmitter.subscribe(() => {
      this._message.success('La imagen fue eliminada correcta mente');
      photosViewComponent.close();
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('product');
  }
}
