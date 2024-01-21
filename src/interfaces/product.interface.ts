import { IPhoto } from './photo.interface';

export interface IProduct {
  id?: string;
  name: string;
  description?: string;
  photos: IPhoto[];
}
