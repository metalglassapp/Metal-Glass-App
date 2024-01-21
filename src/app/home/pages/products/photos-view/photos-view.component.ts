import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IPhoto } from '../../../../../interfaces/photo.interface';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ProductsService } from '../products.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { IProduct } from '../../../../../interfaces/product.interface';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-photos-view',
  standalone: true,
  // imports: [NgFor, NzCarouselModule],
  imports: [
    NgIf,
    NzButtonModule,
    NzMessageModule,
    NzPopoverModule,
    NzGridModule,
  ],
  template: `
    <!-- <p>photos-view works!</p> -->
    <div *ngIf="photo && product">
      <img [src]="photo.url" [alt]="photo.name" [title]="photo.name" />
      <button
        type="button"
        nz-button
        nzType="primary"
        nzDanger
        nz-popover
        nzPopoverTitle="¿Seguro de eliminar está imagen?"
        [(nzPopoverVisible)]="visible"
        nzPopoverTrigger="click"
        [nzPopoverContent]="contentTemplate"
      >
        Eliminar imagen
      </button>
      <ng-template #contentTemplate>
        <div nz-row nzAlign="middle" nzGutter="24" nzJustify="space-around">
          <div nz-col>
            <button
              type="button"
              nz-button
              nzType="primary"
              (click)="visible = false"
            >
              Mejor no
            </button>
          </div>
          <div nz-col>
            <button
              type="button"
              nz-button
              nzType="primary"
              nzDanger
              (click)="deletePhoto(product, photo)"
            >
              Si
            </button>
          </div>
        </div>
      </ng-template>
    </div>
    <!-- <nz-carousel [nzDotPosition]="'bottom'">
      <div nz-carousel-content *ngFor="let photo of photos">
      </div>
    </nz-carousel> -->
  `,
  styles: [
    `
      nz-radio-group {
        margin-bottom: 8px;
      }

      [nz-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h3 {
        color: #fff;
        margin-bottom: 0;
        user-select: none;
      }

      img {
        max-width: 100%;
        margin-bottom: 24px;
        // max-height: 100%;
      }
    `,
  ],
})
export class PhotosViewComponent implements OnInit {
  @Output() deletePhotoEmitter: EventEmitter<boolean> = new EventEmitter();
  // public photos: IPhoto[] = [];
  public photo: IPhoto | null = null;
  public product: IProduct | null = null;

  public visible: boolean = false;

  constructor(
    private _productsSvc: ProductsService,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    // this.photos = JSON.parse(localStorage.getItem('photos') ?? '[]');
    this.product = JSON.parse(localStorage.getItem('product') ?? 'null');
    this.photo = JSON.parse(localStorage.getItem('photo') ?? 'null');
  }

  deletePhoto(product: IProduct, photo: IPhoto): void {
    this._productsSvc
      .deletePhoto(`${photo.collection}/${photo.name}`)
      .then(() => {
        this._productsSvc.removePhotoItem(product, photo).then(() => {
          this.deletePhotoEmitter.emit(true);
        });
      })
      .catch((error) => {
        console.log({ error });
        this._message.error(
          'No fue posible eliminar la foto, por favor vuelva a intentarlo'
        );
      });
  }
}
