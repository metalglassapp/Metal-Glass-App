import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DatePipe, DecimalPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { QuoteFormComponent } from '../../quote-form/quote-form.component';
import { QuotePdfGeneratorComponent } from '../quote-pdf-generator/quote-pdf-generator.component';
import { QuotesService } from '../../quotes.service';
import { IClient } from '../../../../../../interfaces/client.interface';
import { IinfoQuote } from '../../../../../../interfaces/pdf-generetor-infoQuote.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as moment from 'moment';

@Component({
  selector: 'app-quote-summary-view',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DecimalPipe,
    DatePipe,
    JsonPipe,
    QuotePdfGeneratorComponent,
    NzGridModule,
    NzModalModule,
    NzListModule,
    NzTypographyModule,
    NzCardModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './quote-summary-view.component.html',
  styles: [
    `
      .selectedAccessoryList {
        width: 100%;
      }
    `,
  ],
})
export class QuoteSummaryViewComponent implements OnInit, OnDestroy {
  @Input() quote: any;
  @Input() formQuoteGeneral: any;
  @Input() productsPerQuote: any;
  @Input() typesOfProductsToQuote: any;
  @Input() registrationActionCondition: boolean = false;
  @Input() editActionCondition: boolean = false;
  @Output() registedEmitter: EventEmitter<boolean> = new EventEmitter();

  // public clients: Array<IClient> = [];
  public clients: Array<IClient | { id: string; name: string } | any> = [];

  //
  public infoQuote: IinfoQuote = {
    metalGlassLogo:
      'https://firebasestorage.googleapis.com/v0/b/audio-visual-turno.appspot.com/o/MetalGlassLogo.jpeg?alt=media&token=354bf13d-f55c-46ef-bd7e-117c673fc4a2',
    // quoteNumber: 180,
    quoteNumber: 0,
    Nit: '1027946515',
    cell: '3128733017',
    headerTitle:
      'PUERTAS, VENTANAS, PASAMANOS, REJAS, FACHADAS, CABINAS DE BAÑO, ESPEJOS, REPARACIÓN Y MANTENIMIENTO',
    clientNit: '',
    clientName: '',
    contact: '',
    date: '14/03/2023',
    city: 'APARTADO',
    clientPhone: '',
    address: 'POLICARPA',
    mail: '',
    discountPercentege: 0,
    totalPay: 0,
    items: [],
    //     observations: `ENTREGA: A CONVENIR. OFERTA VÁLIDA : 30 DÍAS
    // NOTA: La empresa no se hace responsable de resanes por descuadres de vanos.
    //  Esta cotización está sujeta a cambios sin previo aviso.
    // FORMA DE PAGO: 60% Para iniciar la obra, 20% en avance de y 20% al entregar.
    // CONSIGNAR BANCOLOMBIA CUENTA DE AHORROS N° 5 4 9 0 0 0 3 8 1 9 7 A NOMBRE
    // DE SERNA MARTINEZ ROBERT`,
  };

  constructor(
    private _quoteSvc: QuotesService,
    private _router: Router,
    private _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.steInputPropieties();
    this.getForm();
    this.getCLients();
    this.infoQuoteLoad();
  }

  steInputPropieties(): void {
    this.quote = JSON.parse(localStorage.getItem('quote') ?? 'null');
    this.formQuoteGeneral = JSON.parse(
      localStorage.getItem('formQuoteGeneral') ?? 'null'
    );
    this.productsPerQuote = JSON.parse(
      localStorage.getItem('productsPerQuote') ?? 'null'
    );
    this.typesOfProductsToQuote = JSON.parse(
      localStorage.getItem('typesOfProductsToQuote') ?? 'null'
    );
    this.registrationActionCondition = JSON.parse(
      localStorage.getItem('registrationActionCondition') ?? 'null'
    );
    this.editActionCondition = JSON.parse(
      localStorage.getItem('editActionCondition') ?? 'null'
    );
  }

  itemsEmiter(item: any): void {
    this.infoQuote.items = [];
  }

  infoQuoteLoad(): void {
    this.infoQuote.items = [];
    this.infoQuote.date = moment
      .utc(this.formQuoteGeneral.createdAt)
      // .format('DD-MM-YYYY h:mma');
      .format('DD-MM-YYYY');
    this.infoQuote.quoteNumber = this.formQuoteGeneral.quoteNumber;
    this.infoQuote.others = this.formQuoteGeneral.others;
    this.infoQuote.extraPercentage = this.formQuoteGeneral.extraPercentage;
    this.infoQuote.totalPay = this.formQuoteGeneral.generalValue;
    this.formQuoteGeneral.observations
      ? (this.infoQuote.observations = this.formQuoteGeneral.observations)
      : false;
    this.formQuoteGeneral.metalGlassNit
      ? (this.infoQuote.metalGlassNit = this.formQuoteGeneral.metalGlassNit)
      : false;
    this.formQuoteGeneral.metalGlassCellPhoneNumber
      ? (this.infoQuote.metalGlassCellPhoneNumber =
          this.formQuoteGeneral.metalGlassCellPhoneNumber)
      : false;
    this.formQuoteGeneral.headerTitle
      ? (this.infoQuote.headerTitle = this.formQuoteGeneral.headerTitle)
      : false;
    this.formQuoteGeneral.clientNit
      ? (this.infoQuote.clientNit = this.formQuoteGeneral.clientNit)
      : false;
    // this.formQuoteGeneral.clientContact
    //   ? (this.infoQuote.clientContact = this.formQuoteGeneral.clientContact)
    //   : false;
    this.formQuoteGeneral.clientContact
      ? (this.infoQuote.contact = this.formQuoteGeneral.clientContact)
      : false;
    this.formQuoteGeneral.city
      ? (this.infoQuote.city = this.formQuoteGeneral.city)
      : false;
    this.formQuoteGeneral.address
      ? (this.infoQuote.address = this.formQuoteGeneral.address)
      : false;
    this.formQuoteGeneral.email
      ? (this.infoQuote.mail = this.formQuoteGeneral.email)
      : false;
    this.formQuoteGeneral.formQuoteGeneralArray.forEach(
      (formQuoteGeneralItem: any, i: number) => {
        let description = `${this.productsPerQuote[i].type} `;
        formQuoteGeneralItem.addForm.aditionalReference.forEach(
          (aditionalReference: { label: string; reference: string }) => {
            description += ` -${aditionalReference.label} `;
          }
        );
        this.infoQuote.items.push({
          itemNumber: this.infoQuote.items.length + 1,
          itemDescription: description,
          itemAmount: this.productsPerQuote[i].amountPosition,
          unityValue: formQuoteGeneralItem.value,
          totalValue: formQuoteGeneralItem.value,
        });
      }
    );
    // this.productsPerQuote.forEach((productPerQuoteItem: { type: string, amountPosition: number, articuleNumber: number }) => {
    //   this.infoQuote.items.push({
    //     itemNumber: this.infoQuote.items.length + 1,
    //     itemDescription: productPerQuoteItem.type,
    //     itemAmount: productPerQuoteItem.type,
    //   });
    // })
  }

  getCLients(): void {
    // this.formQuoteGeneral.clients.forEach((clientItem: IClient | any) => {
    //   // this._quoteSvc.getOneClient(clientItem.id).subscribe(
    //   if (typeof clientItem === 'string') {
    //     this._quoteSvc.getOneClient(clientItem).subscribe(
    //       (clientDB) => {
    //         this.clients.push(clientDB);
    //         this.infoQuote.clientName = clientDB.names;
    //       },
    //       (err) => console.log({ err })
    //     );
    //   } else {
    //     if (this.clients.length === 0) {
    //       this.clients.push(clientItem);
    //       this.infoQuote.clientName = clientItem.name
    //         ? '- ' + clientItem.name + '.'
    //         : '- ' +
    //           this.infoQuote.clientName +
    //           clientItem.names +
    //           ' ' +
    //           clientItem.surnames +
    //           `.`;
    //       this.infoQuote.clientNit = clientItem.Nit;
    //       // this.infoQuote.contact = clientItem.contact;
    //       this.infoQuote.address = clientItem.address;
    //       this.infoQuote.city = clientItem.City;
    //       this.infoQuote.clientPhone = clientItem.phoneNumber;
    //       this.infoQuote.mail = clientItem.email;
    //     } else if (this.clients.length > 0) {
    //       this.clients.push(clientItem);
    //       this.infoQuote.clientName +=
    //         `
    //         -` +
    //         clientItem.names +
    //         ' ' +
    //         clientItem.surnames +
    //         `.`;
    //     }
    //   }
    // });
    Array.isArray(this.formQuoteGeneral.client)
      ? this.formQuoteGeneral.client.forEach((clientId: string) => {
          this._quoteSvc
            .getOneClient(clientId)
            .then((clientDB) => {
              // this.clients.push(clientDB);
              // this.infoQuote.clientName = clientDB.names;
            })
            .catch((error) => {
              console.log({ error });
            });
        })
      : this._quoteSvc
          .getOneClient(this.formQuoteGeneral.client.id)
          .then((clientDB) => {
            // this.clients.push(clientDB);
            // this.infoQuote.clientName = clientDB.names;
            this.clients.push(this.formQuoteGeneral.client);
            this.infoQuote.clientName = this.formQuoteGeneral.client.names;
          })
          .catch((error) => {
            console.log({ error });
          });
  }

  getForm(): void {
    if (this.registrationActionCondition || this.editActionCondition) {
      let formQuoteGeneral = { ...this.formQuoteGeneral };
      formQuoteGeneral.formQuoteGeneralArray.forEach(
        (formQuoteGeneralItem: any) => {
          if (formQuoteGeneralItem.addForm.SelectedAccessories.length > 0) {
            formQuoteGeneralItem.addForm.SelectedAccessories.forEach(
              (selectedAccessoryItem: any) => {
                selectedAccessoryItem.value =
                  selectedAccessoryItem.amount *
                  selectedAccessoryItem.accessory.price;
                formQuoteGeneralItem.addForm.accessoriesTotal +=
                  selectedAccessoryItem.value;
              }
            );
            formQuoteGeneralItem.value +=
              formQuoteGeneralItem.addForm.accessoriesTotal;
          }
          if (formQuoteGeneralItem.addForm.selectedProfiles.length > 0) {
            formQuoteGeneralItem.addForm.selectedProfiles.forEach(
              (selectedProfileItem: any) => {
                selectedProfileItem.value =
                  selectedProfileItem.amount *
                  selectedProfileItem.profile.pricePerMeter;
                formQuoteGeneralItem.addForm.profilesTotal +=
                  selectedProfileItem.value;
              }
            );
            formQuoteGeneralItem.value +=
              formQuoteGeneralItem.addForm.profilesTotal;
          }
          if (formQuoteGeneralItem.addForm.selectedGlasses.length > 0) {
            formQuoteGeneralItem.addForm.selectedGlasses.forEach(
              (selectedGlassItem: any) => {
                selectedGlassItem.value =
                  selectedGlassItem.amount *
                  selectedGlassItem.glass.pricePerSquareMeter;
                formQuoteGeneralItem.addForm.glassesTotal +=
                  selectedGlassItem.value;
              }
            );
            formQuoteGeneralItem.value +=
              formQuoteGeneralItem.addForm.glassesTotal;
          }
          if (formQuoteGeneralItem.addForm.selectedAcrylics.length > 0) {
            formQuoteGeneralItem.addForm.selectedAcrylics.forEach(
              (selectedAcrylicItem: any) => {
                selectedAcrylicItem.value =
                  selectedAcrylicItem.amount *
                  selectedAcrylicItem.acrylic.pricePerSquareMeter;
                formQuoteGeneralItem.addForm.acrylicsTotal +=
                  selectedAcrylicItem.value;
              }
            );
            formQuoteGeneralItem.value +=
              formQuoteGeneralItem.addForm.acrylicsTotal;
          }
          formQuoteGeneral.generalValue += formQuoteGeneralItem.value;
        }
      );
      this.formQuoteGeneral = formQuoteGeneral;
      this.formQuoteGeneral.generalValue += this.formQuoteGeneral.others;
      this.formQuoteGeneral.generalValue +=
        (this.formQuoteGeneral.generalValue *
          this.formQuoteGeneral.extraPercentage) /
        100;
    }
  }

  ngOnDestroy() {
    if (this.registrationActionCondition || this.editActionCondition) {
      this.formQuoteGeneral.formQuoteGeneralArray.forEach(
        (formQuoteGeneralItem: any) => {
          if (formQuoteGeneralItem.addForm.SelectedAccessories.length > 0) {
            formQuoteGeneralItem.addForm.SelectedAccessories.forEach(
              (selectedAccessoryItem: any) => {
                selectedAccessoryItem.value = 0;
                formQuoteGeneralItem.addForm.accessoriesTotal = 0;
              }
            );
            formQuoteGeneralItem.value = 0;
          }
          if (formQuoteGeneralItem.addForm.selectedProfiles.length > 0) {
            formQuoteGeneralItem.addForm.selectedProfiles.forEach(
              (selectedProfileItem: any) => {
                selectedProfileItem.value = 0;
                formQuoteGeneralItem.addForm.profilesTotal = 0;
              }
            );
            formQuoteGeneralItem.value = 0;
          }
          if (formQuoteGeneralItem.addForm.selectedGlasses.length > 0) {
            formQuoteGeneralItem.addForm.selectedGlasses.forEach(
              (selectedGlassItem: any) => {
                selectedGlassItem.value = 0;
                formQuoteGeneralItem.addForm.glassesTotal = 0;
              }
            );
            formQuoteGeneralItem.value = 0;
          }
          if (formQuoteGeneralItem.addForm.selectedAcrylics.length > 0) {
            formQuoteGeneralItem.addForm.selectedAcrylics.forEach(
              (selectedAcrylicItem: any) => {
                selectedAcrylicItem.value = 0;
                formQuoteGeneralItem.addForm.acrylicsTotal = 0;
              }
            );
            formQuoteGeneralItem.value = 0;
          }
          this.formQuoteGeneral.generalValue = 0;
        }
      );
    }
  }

  registerQuote(event?: Event | any): void {
    if (this.registrationActionCondition) {
      if (!this.formQuoteGeneral.pristine) {
        // const client: string = this.formQuoteGeneral.client.id;
        const clientId: string = this.formQuoteGeneral.client.id;
        const client: IClient = this.formQuoteGeneral.client;
        const clientName: string = this.formQuoteGeneral.client.name;
        // this.formQuoteGeneral.client.forEach(
        //   (client: { id: string; name: string }) => {
        //     client.push(client.id);
        //     clientsNames.push(client.name);
        //   }
        // );
        const quoteDTO = {
          ...this.formQuoteGeneral,
          clientId,
          client,
          clientName,
          productsPerQuote: this.productsPerQuote,
          typesOfProductsToQuote: this.typesOfProductsToQuote,
          createdAt: this.changeFormat(new Date()),
          updatedAt: this.changeFormat(new Date()),
        };
        // quoteDTO.formQuoteGeneralArray.forEach(
        //   (formQuoteGeneralArrayItem: any) => {
        //     formQuoteGeneralArrayItem.accessory = JSON.stringify(
        //       formQuoteGeneralArrayItem.accessory
        //     );
        //   }
        // );
        // console.log({ quoteDTO });
        this._quoteSvc
          .registerQuote(quoteDTO)
          .then((quoteDB) => {
            this.registedEmitter.emit(true);
            // this._router.navigate(['admin/home/cotizaciones']);
          })
          .catch((error) => console.log({ error }));
      }
      if (event) {
      }
    }
  }

  changeFormat(date: Date): string {
    const dia = new Array(7);
    dia[0] = 'Domingo';
    dia[1] = 'Lunes';
    dia[2] = 'Martes';
    dia[3] = 'Miércoles';
    dia[4] = 'Jueves';
    dia[5] = 'Viernes';
    dia[6] = 'Sábado';
    // return dia[day];
    const pipe = new DatePipe('en-US');
    return `
    ${dia[date.getDay()]},
    ${pipe.transform(date, 'dd/MM/YYYY, h:mm a') ?? ''}
    `;
  }

  quoteEditAction(): void {
    const quote = this.formQuoteGeneral;
    this._modalService.info({
      nzTitle: 'Editar Cotización',
      // nzContent: QuoteEditComponent,
      nzContent: QuoteFormComponent,
      nzWidth: '90%',
      // nzComponentParams: { quote, editActionCondition: true },
      nzIconType: 'edit',
      // nzOnCancel: () => this.getProducts(),
      // nzOnOk: () => this.getProducts(),
    });
    localStorage.setItem('quote', JSON.stringify(quote));
    localStorage.setItem('editActionCondition', JSON.stringify(true));
  }

  editQuote(event?: Event | any): void {
    if (this.editActionCondition) {
      if (!this.formQuoteGeneral.pristine) {
        const quoteDTO = {
          ...this.formQuoteGeneral,
          productsPerQuote: this.productsPerQuote,
          typesOfProductsToQuote: this.typesOfProductsToQuote,
        };
        quoteDTO.formQuoteGeneralArray.forEach(
          (formQuoteGeneralArrayItem: any) => {
            formQuoteGeneralArrayItem.accessory = JSON.stringify(
              formQuoteGeneralArrayItem.accessory
            );
          }
        );
        this._quoteSvc
          .editQuote(quoteDTO, this.quote.id)
          .then((quoteDBPostEdited) => {})
          .catch((err) => console.log({ err }));
      }
      if (event) {
      }
    }
  }
}
