import { Injectable } from '@angular/core';
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
  setDoc,
} from '@angular/fire/firestore';
import { DbCollections } from '../../../../constants/db-collections';
import { IPulledApart } from '../../../../../interfaces/pulled-apart.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PulledApartService {
  private _pulledApartsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.pulledApart
  );

  constructor(private _fireStore: Firestore) {}

  registerPulledApart(
    pulledApartDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._pulledApartsRef, pulledApartDTO);
  }

  getPulledAparts(): Observable<Array<IPulledApart>> {
    return collectionData(this._pulledApartsRef, {
      idField: 'id',
    }) as Observable<Array<IPulledApart>>;
  }

  async editPulledApart(
    pulledApartId: string,
    pulledApartDTO: any
  ): Promise<void> {
    const _pulledApartDocRef = doc(
      this._fireStore,
      DbCollections.pulledApart,
      pulledApartId
    );
    return await setDoc(_pulledApartDocRef, pulledApartDTO);
  }

  // deleteDocumentType(documentTypeId: string): Observable<any> {
  async deletePulledApart(pulledApartId: string): Promise<void> {
    const _pulledApartDocRef = doc(
      this._fireStore,
      DbCollections.pulledApart,
      pulledApartId
    );
    return await deleteDoc(_pulledApartDocRef);
  }

  async deleteAccessory(accessoryId: string): Promise<void> {
    const _accessoryDocRef = doc(
      this._fireStore,
      DbCollections.accessories,
      accessoryId
    );
    return await deleteDoc(_accessoryDocRef);
  }

  async deleteProfile(profileId: string): Promise<void> {
    const _profileDocRef = doc(
      this._fireStore,
      DbCollections.profiles,
      profileId
    );
    return await deleteDoc(_profileDocRef);
  }

  async deleteGlass(glassId: string): Promise<void> {
    const _glassDocRef = doc(this._fireStore, DbCollections.glasses, glassId);
    return await deleteDoc(_glassDocRef);
  }

  async deleteAcrylic(acrylicId: string): Promise<void> {
    const _acrylicDocRef = doc(
      this._fireStore,
      DbCollections.acrylics,
      acrylicId
    );
    return await deleteDoc(_acrylicDocRef);
  }
}
