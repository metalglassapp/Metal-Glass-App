import { IAccessory } from './accessory.interface';
import { IAcrylic } from './acrylic.interface';
import { IGlass } from './glass.interface';
import { IProfile } from './profile.interface';

export interface IPulledApartData {
  reference: string;
  tittle: string;
  pulledAparts:
    | Array<IProfile>
    | Array<IAcrylic>
    | Array<IAccessory>
    | Array<IGlass>;
  formControl_price: {
    label: string;
    errorLabel: string;
    name: string;
    value: number | null;
  };
}
