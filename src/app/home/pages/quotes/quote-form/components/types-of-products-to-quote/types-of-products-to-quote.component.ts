import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductTypePerQuote } from '../../../../../../../interfaces/productTypePerQuote.interface';
import { IProductTypePerQuoteList } from '../../../../../../../interfaces/productTypePerQuoteList.interface';
import { NgFor, NgIf } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-types-of-products-to-quote',
  standalone: true,
  imports: [NgIf, NgFor, NzGridModule, NzCardModule, NzTypographyModule],
  template: `
    <!-- <p>types-of-products-to-quote works!</p>  -->
    <h3 nz-typography>Tipos de roductos para cotizar</h3>
    <div nz-row nzAlign="middle" [nzGutter]="[0, 12]" nzJustify="center">
      <div
        nz-col
        nzSpan="24"
        *ngFor="let productType of typesOfProductsToQuote; let i = index"
      >
        <nz-card nzHoverable (click)="emit(productType.type)">
          <div
            nz-row
            nzAlign="middle"
            [nzGutter]="[24, 24]"
            nzJustify="space-between"
          >
            <div nz-col>
              <h5 nz-typography>{{ productType.type }}</h5>
            </div>
            <div nz-col>
              <h5 nz-typography>
                <div *ngIf="productType.amount > 0">
                  {{ productType.amount }}
                </div>
              </h5>
            </div>
          </div>
        </nz-card>
      </div>
    </div>
  `,
  styles: ``,
})
export class TypesOfProductsToQuoteComponent {
  @Input() typesOfProductsToQuote: Array<IProductTypePerQuote> = [
    { type: 'Ventana', amount: 0 },
    { type: 'Puerta', amount: 0 },
    { type: 'Reja', amount: 0 },
    // { type: '"otro"', amount: 0 },
  ];
  @Input() productsList: Array<IProductTypePerQuoteList> = [];
  @Output() typesEmiter = new EventEmitter<Array<IProductTypePerQuote>>();
  @Output() typesOfProductsToQuoteEmiter = new EventEmitter<
    Array<IProductTypePerQuoteList>
  >();

  constructor() {}

  // emit(e: Event | string, i: number) {
  emit(type: string) {
    this.typesOfProductsToQuote.forEach((typePerQuote) => {
      if (typePerQuote.type === type) {
        typePerQuote.amount += 1;
        this.productsList.push({
          type,
          amountPosition: typePerQuote.amount,
          articuleNumber: this.productsList.length + 1,
        });
      }
    });
    // const typeList = [...this.typesOfProductsToQuote];
    const typeList = [...this.productsList];
    this.typesEmiter.emit(this.typesOfProductsToQuote);
    this.typesOfProductsToQuoteEmiter.emit(typeList);
  }
}
