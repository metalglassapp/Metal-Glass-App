import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IinfoQuote } from '../../../../../../interfaces/pdf-generetor-infoQuote.interface';
import { Columns, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NzButtonModule } from 'ng-zorro-antd/button';

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-quote-pdf-generator',
  standalone: true,
  imports: [NzButtonModule],
  template: `
    <!-- <p>quote-pdf-generator works!</p> -->
    <button nz-button nzType="primary" (click)="generatePdf()">
      generar PDF
    </button>
  `,
  styles: [``],
})
export class QuotePdfGeneratorComponent {
  @Input() infoQuote: IinfoQuote = {
    metalGlassLogo: '',
    quoteNumber: 0,
    Nit: '',
    cell: '',
    headerTitle: '',
    clientNit: '',
    clientName: '',
    contact: '',
    date: '',
    city: '',
    clientPhone: '',
    address: '',
    mail: '',
    discountPercentege: 0,
    totalPay: 0,
    items: [
      {
        itemNumber: 0,
        itemDescription: ``,
        itemAmount: 0,
        unityValue: 0,
        totalValue: 0,
      },
    ],
  };

  @Output() itemsEmiter = new EventEmitter<any>();

  public productItems: Array<Array<any>> = [];

  constructor() {}

  async generatePdf(): Promise<void> {
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Columns([
        new Txt('').width(80).end,

        await new Img(`${this.infoQuote.metalGlassLogo}`)
          .height(100)
          .width(190)
          .build(),

        new Txt('').width(80).end,

        new Table([
          [new Txt('Cotización').color('#ffffff').end],
          [
            new Txt(`${this.infoQuote.quoteNumber}`)
              .color('#171e52')
              .alignment('center').end,
          ],
        ])
          .width(50)
          .margin([0, 30])
          .layout({
            fillColor: (rowIndex) => {
              if (rowIndex === 0) {
                return '#171e52';
              }

              return '#ffffff';
            },
          }).end,
      ]).end
    );

    pdf.add(
      new Columns([
        new Txt('').width(40).end,
        new Txt(`
        NIT: ${this.infoQuote.Nit}              CEL ${this.infoQuote.cell}
        `)
          .bold()
          .fontSize(13)
          .color('#171e52').end,
      ]).end
    );

    pdf.add(
      new Txt(`${this.infoQuote.headerTitle}`)
        .fontSize(13)
        .color('#171e52')
        .alignment('center').end
    );

    pdf.add(
      new Table([
        [
          new Txt('NIT').color('#ffffff').end,
          // new Txt('Cliente').color('#ffffff').end,
          new Txt('Clientes').color('#ffffff').end,
          new Txt('Contacto').color('#ffffff').end,
          new Txt('Fecha').color('#ffffff').end,
          new Txt('Ciudad').color('#ffffff').end,
        ],
        [
          `${this.infoQuote.clientNit ?? 'No es pecificado'}`,
          new Txt(
            `${this.infoQuote.clientName ?? 'No es pecificado'}`
          ).alignment('left').end,
          `${this.infoQuote.contact ?? 'No es pecificado'}`,
          `${this.infoQuote.date}`,
          `${this.infoQuote.city ?? 'No es pecificado'}`,
        ],
        [
          new Txt('Teléfono').color('#ffffff').end,
          new Txt('Dirección').color('#ffffff').end,
          new Txt('Email').color('#ffffff').end,
          new Txt('Descuento (%)').color('#ffffff').end,
          new Txt('T. Pago').color('#ffffff').end,
        ],
        [
          `${this.infoQuote.clientPhone ?? 'No es pecificado'}`,
          `${this.infoQuote.address ?? 'No es pecificado'}`,
          `${this.infoQuote.mail ?? 'No es pecificado'}`,
          `${this.infoQuote.discountPercentege ?? 'No es pecificado'}`,
          `${this.infoQuote.totalPay ?? 'No es pecificado'}`,
        ],
      ])
        .widths([80, 115, 115, 80, 80])
        .margin([0, 20])
        .alignment('center')
        .layout({
          fillColor: (rowIndex) => {
            if ((rowIndex && rowIndex % 2 === 0) || rowIndex === 0) {
              return '#171e52';
            }

            return '#ffffff';
          },
        }).end
    );

    //init
    this.infoQuote.items.forEach((item, i) => {
      this.productItems.push([
        new Txt(`${item.itemNumber}`).end,
        new Txt(`${item.itemDescription}`).alignment('left').end,
        new Txt(`${item.itemAmount}`).end,
        new Txt(`${item.unityValue}`).end,
        new Txt(`${item.totalValue}`).end,
      ]);
    });
    //end

    pdf.add(
      new Table([
        [
          new Txt('Ítem').color('#ffffff').end,
          new Txt('').color('#ffffff').end,
          new Txt('Cantidad').color('#ffffff').end,
          new Txt('Vr. Unitario').color('#ffffff').end,
          new Txt('Vr Total').color('#ffffff').end,
        ],
        ...this.productItems,
      ])
        .widths(['auto', 280, 'auto', 'auto', 'auto'])
        .margin([0, 20])
        .alignment('center')
        .layout({
          fillColor: (rowIndex) => {
            // if ((rowIndex && rowIndex % 2 === 0) || rowIndex === 0) {
            if (rowIndex === 0) {
              return '#171e52';
            }

            return '#ffffff';
          },
        }).end
    );

    pdf.add(
      new Txt(`
      `).end
    );

    pdf.add(
      new Txt(`
      `).end
    );

    pdf.add(
      new Columns([
        new Table([
          [new Txt('Otros').end],
          [new Txt('Porcentaje extra').end],
          [new Txt('Gran Total').end],
          [new Txt('Descuento').end],
          [new Txt('Subtotal').end],
          [new Txt('IVA (0)').end],
          [new Txt('Valor total').end],
        ]).widths('*').end,
        new Table([
          [new Txt(`$${this.infoQuote.others}`).end],
          [new Txt(`${this.infoQuote.extraPercentage}%`).end],
          [new Txt(`$${this.infoQuote.totalPay}`).end],
          [new Txt('$0').end],
          [new Txt(`$${this.infoQuote.totalPay}`).end],
          [new Txt('$0').end],
          [new Txt(`$${this.infoQuote.totalPay}`).end],
        ]).widths('*').end,
      ]).end
    );

    pdf.add(
      new Txt(`
    `).end
    );

    if (this.infoQuote.observations) {
      pdf.add(
        new Table([
          [new Txt(`${this.infoQuote.observations}`).color('#ffffff').end],
        ])
          .width('*')
          // .widths(['auto', 280, 'auto', 'auto', 'auto'])
          .layout({
            defaultBorder: false,
            fillColor: (rowIndex) => {
              // if ((rowIndex && rowIndex % 2 === 0) || rowIndex === 0) {
              if (rowIndex === 0) {
                return '#171e52';
              }

              return '#ffffff';
            },
          }).end
      );
    }

    pdf.info({
      // title: 'Cotizacion - 180',
      title: `Cotizacion - ${this.infoQuote.quoteNumber ?? ''}`,
    });

    pdf.create().open();
    pdf.create().download(`Cotizacion - ${this.infoQuote.quoteNumber ?? ''}`);
    this.emiter();
  }

  emiter(): void {
    this.itemsEmiter.emit(this.infoQuote.items);
  }
}
