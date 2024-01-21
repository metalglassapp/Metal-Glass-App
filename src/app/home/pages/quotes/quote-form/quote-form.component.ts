import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { QuoteSummaryViewComponent } from '../components/quote-summary-view/quote-summary-view.component';
import { TypesOfProductsToQuoteComponent } from './components/types-of-products-to-quote/types-of-products-to-quote.component';
import { QuotesService } from '../quotes.service';
import { RoutesApp } from '../../../../constants';
import { IQuote } from '../../../../../interfaces/quote.interface';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { IAccessory } from '../../../../../interfaces/accessory.interface';
import { IProfile } from '../../../../../interfaces/profile.interface';
import { IGlass } from '../../../../../interfaces/glass.interface';
import { IAcrylic } from '../../../../../interfaces/acrylic.interface';
import { IAditionalReference } from '../../../../../interfaces/aditional-reference.interface';
import { IClient } from '../../../../../interfaces/client.interface';
import { IProductTypePerQuoteList } from '../../../../../interfaces/productTypePerQuoteList.interface';
import { IProductTypePerQuote } from '../../../../../interfaces/productTypePerQuote.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DecimalPipe,
    ReactiveFormsModule,
    FormsModule,
    GlobalHeaderComponent,
    QuoteSummaryViewComponent,
    TypesOfProductsToQuoteComponent,
    NzGridModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzCollapseModule,
    NzSelectModule,
    NzDividerModule,
    NzButtonModule,
  ],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css',
})
export class QuoteFormComponent implements OnInit, OnDestroy {
  @Input() quote: IQuote | null = null;
  @Input() editActionCondition: boolean = false;

  public headerInfo: IGlobalHeaderData = {
    tittle: 'Registrar cotizacion',
    backTo: {
      label: 'Volver a cotizaciones',
      route: `${RoutesApp.home}/${RoutesApp.quotes}`,
    },
  };

  public formQuoteGeneral: FormGroup = this._fb.group({
    metalGlassNit: ['1027946515', [Validators.required]],
    metalGlassCellPhoneNumber: ['3128733017', [Validators.required]],
    headerTitle: [
      `PUERTAS, VENTANAS, PASAMANOS, REJAS, FACHADAS, CABINAS DE BAÑO, ESPEJOS, REPARACIÓN Y MANTENIMIENTO`,
      [Validators.required],
    ],
    formQuoteGeneralArray: this._fb.array([
      this._fb.group({
        addForm: this._fb.group({
          aditionalReference: [[], [Validators.required]],
          SelectedAccessories: [[]],
          accessoriesTotal: [0],
          selectedProfiles: [[]],
          profilesTotal: [0],
          selectedGlasses: [[]],
          glassesTotal: [0],
          selectedAcrylics: [[]],
          acrylicsTotal: [0],
        }),
        value: [0],
      }),
    ]),
    // clients: [[], [Validators.required]],
    client: ['', [Validators.required]],
    clientNit: [''],
    clientContact: [''],
    city: ['', [Validators.required]],
    clientCellPhoneNumber: [''],
    address: ['', [Validators.required]],
    email: [''],
    others: [0, [Validators.required, Validators.min(0)]],
    extraPercentage: [60, [Validators.required, Validators.min(0)]],
    observations: [
      `ENTREGA: A CONVENIR. OFERTA VÁLIDA : 30 DÍAS
NOTA: La empresa no se hace responsable de resanes por descuadres de vanos.
 Esta cotización está sujeta a cambios sin previo aviso.
FORMA DE PAGO: 60% Para iniciar la obra, 20% en avance de y 20% al entregar.
CONSIGNAR BANCOLOMBIA CUENTA DE AHORROS N° 5 4 9 0 0 0 3 8 1 9 7 A NOMBRE
DE SERNA MARTINEZ ROBERT`,
    ],
    generalValue: [0],
    quoteNumber: [0],
  });

  get formQuoteGeneralArray() {
    return this.formQuoteGeneral.controls['formQuoteGeneralArray'] as FormArray;
  }

  public accessories: Array<IAccessory> = [];
  public profiles: Array<IProfile> = [];
  public glasses: Array<IGlass> = [];
  public acrylics: Array<IAcrylic> = [];
  public AditionalReferences: Array<IAditionalReference> = [];
  public clients: Array<IClient> = [];

  public typesOfProductsToQuote: Array<{
    type: string;
    amount: number;
  }> = [
    { type: 'Puerta', amount: 0 },
    { type: 'Ventana', amount: 0 },
    { type: 'Pasamano', amount: 0 },
    { type: 'Reja', amount: 0 },
    { type: 'Fachada', amount: 0 },
    { type: 'Cabina de baño', amount: 0 },
    { type: 'Espejo', amount: 0 },
    // { type: '"otro"', amount: 0 },
  ];
  public productsPerQuote: Array<{
    type: string;
    amount: number;
    articuleNumber: number;
  }> = [];
  public totalGeneral: number = 0;

  public productsList: Array<IProductTypePerQuoteList> = [];

  constructor(
    private _fb: FormBuilder,
    private _modalService: NzModalService,
    private _quotesService: QuotesService
  ) {}

  ngOnInit(): void {
    this.getInputProperties();
    this.getAparts();
    this.formQuoteGeneralArray.clear();
  }

  getInputProperties(): void {
    // this.quote = JSON.parse(localStorage.getItem('quote') ?? '');
    // this.editActionCondition = JSON.parse(
    //   localStorage.getItem('editActionCondition') ?? ''
    // );
  }

  getAparts(): void {
    this._quotesService.getAccessories().subscribe(
      (accessories) => {
        this.accessories = accessories;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getProfiles().subscribe(
      (profiles) => {
        this.profiles = profiles;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getGlasses().subscribe(
      (glasses) => {
        this.glasses = glasses;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getAcrylics().subscribe(
      (acrylics) => {
        this.acrylics = acrylics;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getAditionalReferences().subscribe(
      (AditionalReferences) => {
        this.AditionalReferences = AditionalReferences;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getClients().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => console.log({ error })
    );
  }

  typesOfProductsToQuoteEmiter(
    typesOfProductsToQuote: Array<IProductTypePerQuoteList>
  ) {
    this.productsList = typesOfProductsToQuote;
    this.productsPerQuote = [];
    typesOfProductsToQuote.forEach((productType, i) => {});
    this.productsList.forEach((productPerQuote, index) => {
      if (index + 1 === this.productsList.length) {
        const productPerQuoteItem = this._fb.group({
          addForm: this._fb.group({
            aditionalReference: [[], [Validators.required]],
            SelectedAccessories: [[]],
            accessoriesTotal: [0],
            selectedProfiles: [[]],
            profilesTotal: [0],
            selectedGlasses: [[]],
            glassesTotal: [0],
            selectedAcrylics: [[]],
            acrylicsTotal: [0],
          }),
          value: [0],
        });
        this.formQuoteGeneralArray.push(productPerQuoteItem);
      }
    });
  }

  typesEmiter(typesOfProductsToQuote: Array<IProductTypePerQuote>): void {
    this.typesOfProductsToQuote = typesOfProductsToQuote;
  }

  articuleRemove(
    productsPerQuote: Array<{
      type: string;
      amount: number;
      articuleNumber: number;
    }>,
    productPerQuote: { type: string; amount: number; articuleNumber: number },
    index: number
  ): void {
    this.typesOfProductsToQuote.forEach((productItem) => {
      if (productItem.type === this.productsList[index].type) {
        productItem.amount -= 1;
      }
    });
    this.productsList.splice(index, 1);
    this.productsList.forEach((productItem, x) => {
      productItem.articuleNumber = x + 1;
      productItem.amountPosition -= 1;
      if (productItem.amountPosition === 0) {
        productItem.amountPosition = 1;
      }
    });
    this.formQuoteGeneralArray.removeAt(index);
  }

  showConfirm(): void {
    const formQuoteGeneral = this.formQuoteGeneral.value;
    const productsPerQuote = this.productsList;
    const typesOfProductsToQuote = this.typesOfProductsToQuote;
    let registrationActionCondition = false;
    if (!this.editActionCondition) {
      registrationActionCondition = true;
    }
    const quoteSummaryViewComponent = this._modalService.create({
      nzTitle: 'Resumen de Cotización',
      // nzContent: RegisterQuoteResumenComponent,
      nzContent: QuoteSummaryViewComponent,
      nzWidth: '90%',
      // nzComponentParams: {
      //   quote: this.quote,
      //   formQuoteGeneral,
      //   productsPerQuote,
      //   typesOfProductsToQuote,
      //   registrationActionCondition,
      //   editActionCondition: this.editActionCondition,
      // },
    });
    localStorage.setItem('quote', JSON.stringify(this.quote));
    localStorage.setItem('formQuoteGeneral', JSON.stringify(formQuoteGeneral));
    localStorage.setItem('productsPerQuote', JSON.stringify(productsPerQuote));
    localStorage.setItem(
      'typesOfProductsToQuote',
      JSON.stringify(typesOfProductsToQuote)
    );
    localStorage.setItem(
      'registrationActionCondition',
      JSON.stringify(registrationActionCondition)
    );
    localStorage.setItem(
      'editActionCondition',
      JSON.stringify(this.editActionCondition)
    );
    quoteSummaryViewComponent.componentInstance?.registedEmitter.subscribe(
      (val) => {
        quoteSummaryViewComponent.close();
        window.location.reload();
      }
    );
  }

  tests(clientsIdsArray: Array<string>): void {
    const client = this.clients.find(
      (clientItem) => clientItem.id === clientsIdsArray[0]
    );
    if (client) {
      client.Nit
        ? this.formQuoteGeneral.controls['clientNit'].setValue(client.Nit)
        : this.formQuoteGeneral.controls['clientNit'].setValue('');
      client.Contact
        ? this.formQuoteGeneral.controls['clientContact'].setValue(
            client.Contact
          )
        : this.formQuoteGeneral.controls['clientContact'].setValue('');
      client.City
        ? this.formQuoteGeneral.controls['city'].setValue(client.City)
        : this.formQuoteGeneral.controls['city'].setValue('');
      client.phoneNumber
        ? this.formQuoteGeneral.controls['clientCellPhoneNumber'].setValue(
            client.phoneNumber
          )
        : this.formQuoteGeneral.controls['clientCellPhoneNumber'].setValue('');
      client.Address
        ? this.formQuoteGeneral.controls['address'].setValue(client.Address)
        : this.formQuoteGeneral.controls['address'].setValue('');
      client.email
        ? this.formQuoteGeneral.controls['email'].setValue(client.email)
        : this.formQuoteGeneral.controls['email'].setValue('');
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('quote');
  }
}
