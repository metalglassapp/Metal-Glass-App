import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ClientRegisterComponent } from '../client-register/client-register.component';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';

import { ClientsService } from '../clients.service';

import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { IClient } from '../../../../../interfaces/client.interface';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-clients-content',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    GlobalHeaderComponent,
    NzGridModule,
    NzTableModule,
    NzFormModule,
    NzSelectModule,
    NzAlertModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
  ],
  templateUrl: './clients-content.component.html',
  styleUrl: './clients-content.component.css',
})
export class ClientsContentComponent {
  public globalHeaderData: IGlobalHeaderData = {
    tittle: 'Clientes',
    backTo: { label: 'Volver a Home', route: '/admin/home' },
  };
  public clients: Array<IClient> = [];
  public clientsView: Array<IClient> = [];
  public searchValue = '';
  public visible = false;
  public allChecked = false;
  public indeterminate = true;
  public documentTypes: Array<string> = [];
  public documentNumbers: Array<string> = [];
  public names: Array<string> = [];
  public surnames: Array<string> = [];

  public filtDocumentTypeCondition: boolean = true;
  public filtDocumentNumberCondition: boolean = true;
  public filtNamesCondition: boolean = true;
  public filtSurNamesCondition: boolean = true;

  public clientPerDelete: IClient | null = null;
  public spinning: boolean = false;

  findClientsFilterForm = this._fb.group({
    documentType: [[], [Validators.required]],
    documentNumber: [[], [Validators.required]],
    names: [[], [Validators.required]],
    surnames: [[], [Validators.required]],
  });

  get tableData() {
    return this.clientsView;
  }

  get formControlDocumentType() {
    return this.findClientsFilterForm.controls['documentType'] as FormControl;
  }

  get formControlDocumentNumber() {
    return this.findClientsFilterForm.controls['documentNumber'] as FormControl;
  }

  get formControlNames() {
    return this.findClientsFilterForm.controls['names'] as FormControl;
  }

  get formControlSurnames() {
    return this.findClientsFilterForm.controls['surnames'] as FormControl;
  }

  constructor(
    private _fb: FormBuilder,
    private _clientsSvc: ClientsService,
    private _message: NzMessageService,
    private _modalSvc: NzModalService
  ) {
    localStorage.setItem('spinning', 'true');
  }

  ngOnInit(): void {
    this.spinning = true;
    this.getClients();
    this.spinning = false;
    const clients = this._clientsSvc.filter('Johan Leandro');
    localStorage.removeItem('client');
  }

  getClients(): void {
    this._clientsSvc.getClients().subscribe(
      (clients) => {
        this.clients = clients;
        this.clientsView = this.clients;
        this.initValueFilters(clients);
      },
      (err) => {
        console.log({ error: err });
      }
    );
  }

  initValueFilters(clients: Array<IClient>): void {
    clients.forEach((client) => {
      if (
        client.documentType &&
        !this.documentTypes.includes(client.documentType.type)
      ) {
        this.documentTypes.push(client.documentType.type);
      }
      this.documentNumbers.push(client.documentNumber);
      this.names.push(client.names);
      this.surnames.push(client.surnames);
    });
  }

  documentTypeFilt(): void {
    this.formControlDocumentNumber.setValue([]);
    this.formControlNames.setValue([]);
    this.formControlSurnames.setValue([]);
    this.clientsView = [];
    this.formControlDocumentType.value.length > 0
      ? this.clients.forEach((client) => {
          this.formControlDocumentType.value.forEach(
            (documentTypeItem: { type: string }) => {
              if (
                client.documentType &&
                client.documentType.type === documentTypeItem.type
              ) {
                this.clientsView.push(client);
              }
            }
          );
        })
      : (this.clientsView = this.clients);
  }

  documentNumberFilt(): void {
    this.formControlDocumentType.setValue([]);
    this.formControlNames.setValue([]);
    this.formControlSurnames.setValue([]);
    this.clientsView = [];
    this.formControlDocumentNumber.value.length > 0
      ? this.clients.forEach((client) => {
          this.formControlDocumentNumber.value.forEach(
            (documentNumberItem: { documentNumber: string }) => {
              if (client.documentNumber === documentNumberItem.documentNumber) {
                this.clientsView.push(client);
              }
            }
          );
        })
      : (this.clientsView = this.clients);
  }

  namesFilt(): void {
    this.formControlDocumentType.setValue([]);
    this.formControlDocumentNumber.setValue([]);
    this.formControlSurnames.setValue([]);
    this.clientsView = [];
    this.formControlNames.value.length > 0
      ? this.clients.forEach((client) => {
          this.formControlNames.value.forEach((nameItem: { names: string }) => {
            if (client.names === nameItem.names) {
              this.clientsView.push(client);
            }
          });
        })
      : (this.clientsView = this.clients);
  }

  surnamesFilt(): void {
    this.formControlDocumentType.setValue([]);
    this.formControlDocumentNumber.setValue([]);
    this.formControlNames.setValue([]);
    this.clientsView = [];
    this.formControlSurnames
      ? this.clients.forEach((client) => {
          this.formControlSurnames.value.forEach(
            (surnameItem: { surnames: string }) => {
              if (client.surnames === surnameItem.surnames) {
                this.clientsView.push(client);
              }
            }
          );
        })
      : (this.clientsView = this.clients);
  }

  restFiltFormValues(list: Array<any>): void {
    if (list.length === 0) {
      this.clientsView = this.clients;
    }
  }

  showEditModal(client: IClient, i: number): void {
    // const clientRegisterComponent = this._modalSvc.info({
    this._modalSvc.info({
      nzTitle: 'Editar Cliente',
      nzContent: ClientRegisterComponent,
      // nzComponentParams: { client },
      nzWidth: '90%',
      nzIconType: 'edit',
      nzOnOk: () => this.getClients(),
      nzOnCancel: () => this.getClients(),
    });
    localStorage.setItem('client', JSON.stringify(client));
    // clientRegisterComponent.componentInstance?.clientEmitter.subscribe(
    //   (next) => {
    //     this.clients.splice(i, 1, next);
    //     this.clientsView.splice(i, 1, next);
    //   }
    // );
  }

  // clientDelete(clientId: string): void {
  clientDelete(client: IClient): void {
    localStorage.setItem('spinning', 'true');
    if (client.id) {
      this._clientsSvc
        .deleteClient(client.id)
        .then((res) => {
          this.getClients();
          this.clientPerDelete = null;
          localStorage.setItem('spinning', 'false');
          this._message.success('El cliente fue eliminado correctamente');
        })
        .catch((error) => {
          localStorage.setItem('spinning', 'false');
          this._message.error(
            'Hubo un problema interno y no fue posible eliminar el cliente, por favor vuelva a intentarlo'
          );
        });
      // this._clientsSvc
      //   // .deleteClient(clientId)
      //   .deleteClient(client.id)
      //   .subscribe(
      //     (clientPostDeleteResponse) => {
      //       this.getClients();
      //       this.clientPerDelete = null;
      //       localStorage.setItem('spinning', 'false');
      //       this._message.success('El cliente fue eliminado correctamente');
      //     },
      //     (error) => {
      //       localStorage.setItem('spinning', 'false');
      //       this._message.error(
      //         'Hubo un problema interno y no fue posible eliminar el cliente, por favor vuelva a intentarlo'
      //       );
      //     }
      //   );
    }
  }
}
