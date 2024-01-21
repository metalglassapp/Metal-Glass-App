export interface IAssignmentRegisterRequest {
  theAssigned: string;
  whoAssigns: Array<string>;
  responsibleForTheAssignment: Array<string>;
  registerDate: Date | string;
  lastUpdateDate: Date | string;
}
