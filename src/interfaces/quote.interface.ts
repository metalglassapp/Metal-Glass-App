import { IAccessory } from './accessory.interface';
import { IAcrylic } from './acrylic.interface';
import { IAditionalReference } from './aditional-reference.interface';
import { IClient } from './client.interface';
import { IGlass } from './glass.interface';
import { IProfile } from './profile.interface';

interface IAditionalReferenceItem {
  reference: IAditionalReference;
  label: string;
}

interface ISelectedAccessoryItem {
  amount: number;
  accessory: IAccessory;
  label: string;
  value: number;
}

interface ISelectedProfileItem {
  amount: number;
  profile: IProfile;
  label: string;
  value: number;
}

interface ISelectedGlassItem {
  amount: number;
  glass: IGlass;
  label: string;
  value: number;
}

interface ISelectedAcrylicItem {
  amount: number;
  acrylic: IAcrylic;
  label: string;
  value: number;
}

interface IAddForm {
  aditionalReference: Array<IAditionalReferenceItem>;
  SelectedAccessories: Array<ISelectedAccessoryItem>;
  accessoriesTotal: number;
  selectedProfiles: Array<ISelectedProfileItem>;
  profilesTotal: number;
  selectedGlasses: Array<ISelectedGlassItem>;
  glassesTotal: number;
  selectedAcrylics: Array<ISelectedAcrylicItem>;
  AcrylicsTotal: number;
}

export interface IFormQuoteGeneralArrayItem {
  addForm: IAddForm;
  value: number;
}

export interface IProductPerQuote {
  amountPosition: number;
  articuleNumber: number;
  type: string;
}

export interface ITypeOfProductToQuote {
  type: string;
  amount: number;
}

export interface IQuote {
  // _id?: string;
  id?: string;
  // clients: Array<IClient>;
  // clientsNames: Array<string>;
  client: Array<IClient>;
  clientName: Array<string>;
  extraPercentage: number;
  formQuoteGeneralArray: Array<IFormQuoteGeneralArrayItem>;
  others: number;
  generalValue: number;
  createdAt?: Date;
  updatedAt?: Date;
  productsPerQuote: Array<IProductPerQuote>;
  typesOfProductsToQuote: Array<ITypeOfProductToQuote>;
  observations?: string;
  metalGlassNit?: string;
  metalGlassCellPhoneNumber?: string;
  headerTitle?: string;
  clientNit?: string;
  clientContact?: string;
  city?: string;
  clientCellPhoneNumber?: string;
  address?: string;
  eamil?: string;
}
