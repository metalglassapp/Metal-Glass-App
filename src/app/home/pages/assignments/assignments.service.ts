import { Injectable, Query } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DbCollections } from '../../../constants/db-collections';
import { IAssignment } from '../../../../interfaces/assignment.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private _assignmentsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.assignments
  );

  private _db = getFirestore();

  constructor(private _fireStore: Firestore) {}

  registerAssignment(
    assignmentDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._assignmentsRef, assignmentDTO);
  }

  getAssignments(): Observable<Array<IAssignment>> {
    // return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
    return collectionData(this._assignmentsRef, {
      idField: 'id',
    }) as Observable<Array<IAssignment>>;
  }

  async editAssignment(
    assignmentId: string,
    assignmentDTO: any
  ): Promise<void> {
    const _assignmentDocRef = doc(
      this._fireStore,
      DbCollections.assignments,
      assignmentId
    );
    return await setDoc(_assignmentDocRef, assignmentDTO);
  }

  // deleteDocumentType(documentTypeId: string): Observable<any> {
  async deleteAssignment(assignmentId: string): Promise<void> {
    const _assignmentDocRef = doc(
      this._fireStore,
      DbCollections.assignments,
      assignmentId
    );
    return await deleteDoc(_assignmentDocRef);
  }

  async filter(theAssigned: string): Promise<any> {
    const assignmentsCollectionRef = collection(
      this._db,
      DbCollections.assignments
    );

    const assignments: Array<IAssignment | DocumentData> = [];
    const q = query(
      assignmentsCollectionRef,
      where('theAssigned', '==', theAssigned + '\uf8ff')
    );
    const assignmentsResult = await getDocs(q);
    assignmentsResult.forEach((assignment: any) => {
      assignments.push(assignment.data());
    });
    return assignments;
  }
}
