import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  collectionData,
  DocumentReference,
  DocumentData,
  doc,
  deleteDoc,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITypeDocument } from '../../../../interfaces/type-document.interface';
import { DbCollections } from '../../../constants/db-collections';

@Injectable({
  providedIn: 'root',
})
export class TypesOfDocumentsService {
  // private typeDocumentSubject = new BehaviorSubject<any>(null);
  // typeDocument$ = this.typeDocumentSubject.asObservable();

  private _typesOfDocumentsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.typesOfDocuments
  );

  // setTypeDocument(typeDocument: any): void {
  //   this.typeDocumentSubject.next(typeDocument);
  // }

  constructor(private _fireStore: Firestore) {}

  getDocumentTypes(): Observable<Array<ITypeDocument>> {
    // return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
    return collectionData(this._typesOfDocumentsRef, {
      idField: 'id',
    }) as Observable<Array<ITypeDocument>>;
  }

  registerDocumentType(
    documentTypeDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._typesOfDocumentsRef, documentTypeDTO);
  }

  // editDocumentType(
  //   documentTypeId: string,
  //   documentTypeDTO: any
  // ): Observable<ITypeDocument> {
  async editDocumentType(
    documentTypeId: string,
    documentTypeDTO: any
  ): Promise<void> {
    // return this._http.put<ITypeDocument>(
    //   `${this._api}/type-document/${documentTypeId}`,
    //   documentTypeDTO
    // );
    const _typeOfDocumentDocRef = doc(
      this._fireStore,
      // `types-of-documents/${documentTypeId}`
      DbCollections.typesOfDocuments,
      documentTypeId
    );
    return await setDoc(_typeOfDocumentDocRef, documentTypeDTO);
  }

  // deleteDocumentType(documentTypeId: string): Observable<any> {
  async deleteDocumentType(documentTypeId: string): Promise<void> {
    const _typeOfDocumentDocRef = doc(
      this._fireStore,
      // `types-of-documents/${documentTypeId}`
      DbCollections.typesOfDocuments,
      documentTypeId
    );
    return await deleteDoc(_typeOfDocumentDocRef);
  }
}
