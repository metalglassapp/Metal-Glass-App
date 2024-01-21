import { DatePipe, NgFor, DecimalPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { QuoteSummaryViewComponent } from '../quote-summary-view/quote-summary-view.component';
import { QuoteFormComponent } from '../../quote-form/quote-form.component';
import { QuotesService } from '../../quotes.service';
import { IQuote } from '../../../../../../interfaces/quote.interface';
import { IClient } from '../../../../../../interfaces/client.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-list-quotes',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    DecimalPipe,
    ReactiveFormsModule,
    QuoteSummaryViewComponent,
    QuoteFormComponent,
    NzGridModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzTableModule,
    NzPopoverModule,
    NzMessageModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzAlertModule,
  ],
  templateUrl: './list-quotes.component.html',
  styles: [
    `
      .filterField {
        width: 100%;
      }
    `,
  ],
})
export class ListQuotesComponent implements OnInit {
  public quotes: Array<IQuote> = [];
  public clients: Array<IClient> = [];

  public nzPopoverVisible: boolean = false;

  public quotePerDelete: any | null = null;
  public quotePerDeletePositon: number | null = null;

  filterForm = this._fb.group({
    clientName: [],
    others: [],
    extraPercentage: [],
    generalValue: [],
  });

  constructor(
    private _quoteSvc: QuotesService,
    private _fb: FormBuilder,
    private _message: NzMessageService,
    private _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getQuotes();
    this.getClients();
  }

  getQuotes(): void {
    this._quoteSvc.getQuotes().subscribe(
      (quotesDB) => {
        this.quotes = quotesDB;
      },
      (err) => console.log({ err })
    );
  }

  getClients(): void {
    this._quoteSvc.getClients().subscribe(
      (clientsDB) => {
        this.clients = clientsDB;
      },
      (err) => console.log({ err })
    );
  }

  quoteViewAction(quote: any): void {
    const productsPerQuote: any = quote.productsPerQuote;
    const formQuoteGeneral = quote;
    this._modalService.info({
      nzTitle: 'Cotización',
      // nzContent: QuoteViewComponent,
      nzContent: QuoteSummaryViewComponent,
      nzWidth: '90%',
      // nzComponentParams: {
      //   productsPerQuote,
      //   formQuoteGeneral,
      //   registrationActionCondition: false,
      // },
      nzIconType: 'eye',
      // nzOnCancel: () => this.getProducts(),
      // nzOnOk: () => this.getProducts(),
    });
    localStorage.setItem('productsPerQuote', JSON.stringify(productsPerQuote));
    localStorage.setItem('formQuoteGeneral', JSON.stringify(formQuoteGeneral));
    localStorage.setItem('registrationActionCondition', JSON.stringify(false));
  }

  quoteEditAction(quote: any): void {
    this._modalService.info({
      nzTitle: 'Editar Cotización',
      // nzContent: QuoteEditComponent,
      nzContent: QuoteFormComponent,
      nzWidth: '90%',
      // nzComponentParams: { quote, editActionCondition: true },
      nzIconType: 'edit',
      nzOnCancel: () => this.getQuotes(),
      nzOnOk: () => this.getQuotes(),
    });
    localStorage.setItem('quote', JSON.stringify(quote));
    localStorage.setItem('editActionCondition', JSON.stringify(true));
  }

  quoteDeleteAction(quote: any): void {
    this._quoteSvc
      .deleteQuote(quote.id)
      .then((postDeleteQuote) => {
        this.quotePerDelete = null;
        this.quotePerDeletePositon = null;
        this.getQuotes();
        this._message.success('La cotización fue eliminada correcta mente');
      })
      .catch((error) => {
        console.log({ error });
        this._message.error(
          'Hubo un error interno por lo que no fue posible eliminar la cotización, por favor vuelva a intentarlo'
        );
      });
  }

  search(clearCondition: boolean, filterDto?: any): void {
    if (clearCondition === true) {
      let quotes: IQuote[] = [];
      this._quoteSvc.getQuotes().subscribe(
        (quotesDB) => {
          this.quotes = quotesDB;
        },
        (err) => console.log({ err })
      );
      this.filterForm.reset();
    }
    if (clearCondition === false) {
      this._quoteSvc
        .filtQuotes(this.removeNullProperties(filterDto))
        .then((quotes) => {
          this.quotes = quotes;
        })
        .catch((error) => console.log({ error }));
    }
    // .subscribe(
    //   (res) => {
    //     localStorage.setItem('spinning', 'false');
    //     res.length > 0
    //       ? (this.quotes = res)
    //       : (this.getQuotes(),
    //         this._message.info(
    //           'No se encontraron resultados en la busqueda'
    //         ));
    //   },
    //   (error) => {
    //     localStorage.setItem('spinning', 'false');
    //     console.log({ error });
    //     this._message.error(
    //       'Hubo un error interno por lo que no se pudo realizar la busqueda'
    //     );
    //     this.getQuotes();
    //   }
    // );
  }

  removeNullProperties(obj: any) {
    for (const key in obj) {
      if (
        obj[key] === null ||
        (Array.isArray(obj[key]) && obj[key].length === 0)
      ) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        this.removeNullProperties(obj[key]);
      }
    }
    return obj;
  }
}
