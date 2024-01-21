export interface IGlobalHeaderData {
  tittle: string;
  backTo: IBackTo;
  logoutCondition?: boolean;
}

interface IBackTo {
  label: string;
  route: string;
}
