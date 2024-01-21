export interface IAssignment {
  // id?: string;
  id?: string;
  // administratorWhoAssigns?: IUser;
  // employeeWhoAssigns?: IEmployee;
  // administratorsResponsibleForTheAssigned?: IUser[];
  // employeesResponsibleForTheAssigned?: IEmployee[];
  whoAssigns: Array<string>;
  responsibleForTheAssignment: Array<string>;
  theAssigned: string;
  // createdAt?: Date;
  registerDate: Date | string;
  lastUpdateDate: Date | string;
}
