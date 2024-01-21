export interface IinfoQuote {
  metalGlassLogo: string;
  quoteNumber: number;
  Nit: string;
  cell: string;
  headerTitle: string;
  clientNit?: string;
  clientName?: string;
  contact?: string;
  // date: Date;
  date: string;
  city: string;
  clientPhone: string;
  // Address: string;
  mail: string;
  discountPercentege: number;
  totalPay: number;
  // item: {
  //   itemNumber: number;
  //   itemDescription?: string;
  //   itemAmount: number;
  //   unityValue: number;
  //   totalValue: number;
  // };
  items: Array<Iitem>;
  observations?: string;
  others?: number;
  extraPercentage?: number;
  metalGlassNit?: string;
  metalGlassCellPhoneNumber?: string;
  clientContact?: string;
  clientCellPhoneNumber?: string;
  address?: string;
  eamil?: string;
}

interface Iitem {
  itemNumber: number;
  itemDescription?: string;
  itemAmount: number;
  unityValue: number;
  totalValue: number;
}
