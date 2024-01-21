export interface IPulledApart {
  id?: string;
  name: string;
  description?: string;
  // discount?: string;
  price: number | null;
  pricePerMeter: number | null;
  pricePerSquareMeter: number | null;
}
