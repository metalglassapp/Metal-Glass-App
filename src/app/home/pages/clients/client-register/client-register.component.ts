import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { ClientsService } from '../clients.service';
import { RoutesApp } from '../../../../constants';
import { IClient } from '../../../../../interfaces/client.interface';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { ITypeDocument } from '../../../../../interfaces/type-document.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TypesOfDocumentsService } from '../../types-of-documents/types-of-documents.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { error } from 'console';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    GlobalHeaderComponent,
    ReactiveFormsModule,
    NzGridModule,
    NzSpinModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.css',
})
export class ClientRegisterComponent implements OnDestroy {
  @Output() clientEmitter: EventEmitter<IClient> = new EventEmitter();
  @Input() client: IClient | null = null;
  public globalHeaderData: IGlobalHeaderData = {
    tittle: 'Registrar Cliente',
    backTo: {
      label: 'Volver a Clientes',
      route: `/${RoutesApp.home}/${RoutesApp.clients}`,
    },
  };
  public documentTypes: ITypeDocument[] = [];
  public registerClientForm = this._fb.group({
    // documentTypeId: ['', [Validators.required]],
    documentType: ['', [Validators.required]],
    documentNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(15)],
    ],
    names: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    surnames: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
    customerGrade: ['1'],
  });

  public spinning: boolean = false;

  // get documentTypeId() {
  //   return this.registerClientForm.controls['documentTypeId'] as FormControl;
  get documentType() {
    return this.registerClientForm.controls['documentType'] as FormControl;
  }

  get documentNumber() {
    return this.registerClientForm.controls['documentNumber'] as FormControl;
  }

  get names() {
    return this.registerClientForm.controls['names'] as FormControl;
  }

  get surnames() {
    return this.registerClientForm.controls['surnames'] as FormControl;
  }

  get phoneNumber() {
    return this.registerClientForm.controls['phoneNumber'] as FormControl;
  }

  get email() {
    return this.registerClientForm.controls['email'] as FormControl;
  }

  get customerGrade() {
    return this.registerClientForm.controls['customerGrade'] as FormControl;
  }

  constructor(
    private _fb: FormBuilder,
    private _clientsSvc: ClientsService,
    private _typeOfDocumentsSvc: TypesOfDocumentsService,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.spinning = true;
    this.getDocumentTypes();
    const client = localStorage.getItem('client');
    client ? (this.client = JSON.parse(client ?? '')) : (this.client = null);
    if (this.client) {
      this.setValueForm(this.client);
    }
    this.spinning = false;
  }

  setValueForm(client: IClient): void {
    // this.documentTypeId.setValue(client.documentType);
    if (client.documentType) {
      // this.documentTypeId.setValue(client.documentType.id);
      this.documentType.setValue(client.documentType);
    }
    this.documentNumber.setValue(JSON.parse(client.documentNumber));
    this.names.setValue(client.names);
    this.surnames.setValue(client.surnames);
    this.phoneNumber.setValue(JSON.parse(client.phoneNumber ?? ''));
    this.email.setValue(client.email);
    // this.customerGrade.setValue(client.customerGrade);
    this.customerGrade.setValue('1');
  }

  registerClient(): void {
    if (this.registerClientForm.valid) {
      localStorage.setItem('spinning', 'true');
      this._clientsSvc
        .registerClient({
          ...this.registerClientForm.value,
          documentNumber: this.registerClientForm.value.documentNumber,
          phoneNumber: this.registerClientForm.value.phoneNumber,
        })
        .then((client) => {
          localStorage.setItem('spinning', 'false');
          this._message.success('El cliente fue registrado correctamente');
          this.registerClientForm.reset();
        })
        .catch((err) => {
          console.log({ error: err });
          localStorage.setItem('spinning', 'false');
          this._message.error(
            'Hubo un error interno registrando el cliente, por favor vuelva a intentarlo'
          );
        });
    }
  }

  getDocumentTypes(): void {
    this._typeOfDocumentsSvc.getDocumentTypes().subscribe(
      (DocumentTypes) => {
        this.documentTypes = DocumentTypes;
      },
      (err) => console.log({ error: err })
    );
  }

  editCLient(): void {
    if (this.client && this.client.id && this.registerClientForm.valid) {
      this.spinning = true;
      this._clientsSvc
        .editClient(this.client.id, {
          ...this.registerClientForm.value,
          documentNumber: JSON.stringify(
            this.registerClientForm.value.documentNumber
          ),
          phoneNumber: JSON.stringify(
            this.registerClientForm.value.phoneNumber
          ),
        })
        .then((res) => {
          // this.client ? (this.spinning = false) : false;
          this._message.success('Cliente editado exitosamente');
          // this.clientEmitter.emit(client);
        })
        .catch((error) => {
          // this.client ? (this.spinning = false) : false;
          this._message.error(
            'Hubo problema interno y no fue posible editar el cliente, por favor vuelva a intentarlo'
          );
        });
      this.spinning = false;
      // localStorage.setItem('spinning', 'true');
      // this.client ? (this.spinning = true) : false;
      // this._clientsSvc
      //   .editClient(this.client._id, {
      //     ...this.registerClientForm.value,
      //     documentNumber: JSON.stringify(
      //       this.registerClientForm.value.documentNumber
      //     ),
      //     phoneNumber: JSON.stringify(
      //       this.registerClientForm.value.phoneNumber
      //     ),
      //   })
      //   .subscribe(
      //     (client) => {
      //       localStorage.setItem('spinning', 'false');
      //       this.client ? (this.spinning = false) : false;
      //       this._message.success('Cliente editado exitosamente');
      //       this.clientEmitter.emit(client);
      //     },
      //     (err) => {
      //       // console.log({ error: err });
      //       localStorage.setItem('spinning', 'false');
      //       this.client ? (this.spinning = false) : false;
      //       this._message.error(
      //         'Hubo problema interno y no fue posible editar el cliente, por favor vuelva a intentarlo'
      //       );
      //     }
      //   );
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('client');
  }
}
