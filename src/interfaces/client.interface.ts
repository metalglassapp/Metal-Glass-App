import { ITypeDocument } from './type-document.interface';

export interface IClient {
  id?: string;
  documentType?: ITypeDocument | any;
  documentNumber: string;
  names: string;
  surnames: string;
  phoneNumber?: string;
  email?: string;
  // shoppingHistory?: IPurchase[];
  // datingHistory?: IAppointment[];
  shoppingHistory?: any[];
  datingHistory?: any[];
  customerGrade?: number;
  Nit?: string;
  Contact?: string;
  Address?: string;
  City?: string;
}
