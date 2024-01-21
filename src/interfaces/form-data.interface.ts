export interface IDataForm {
  reference: string;
  referenceId?: string;
  formControl_name: {
    label: string;
    errorLabel: string;
    name: string;
    value: string | null;
  };
  formControl_price: {
    label: string;
    errorLabel: string;
    name: string;
    value: number | null;
  };
}
