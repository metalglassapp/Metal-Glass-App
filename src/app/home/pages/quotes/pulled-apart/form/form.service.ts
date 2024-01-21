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
import { DbCollections } from '../../../../../constants/db-collections';
import { Observable } from 'rxjs';
import { IAcrylic } from '../../../../../../interfaces/acrylic.interface';
import { IAccessory } from '../../../../../../interfaces/accessory.interface';
import { IProfile } from '../../../../../../interfaces/profile.interface';
import { IGlass } from '../../../../../../interfaces/glass.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _acrylicsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.acrylics
  );

  private _accessoriesRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.accessories
  );

  private _profilesRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.profiles
  );

  private _glassesRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.glasses
  );

  constructor(private _fireStore: Firestore) {}

  registerAcrylic(
    acrylicDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._acrylicsRef, acrylicDTO);
  }

  getAcrylics(): Observable<Array<IAcrylic>> {
    return collectionData(this._acrylicsRef, {
      idField: 'id',
    }) as Observable<Array<IAcrylic>>;
  }

  async editAcrylic(acrylicId: string, acrylicDTO: any): Promise<void> {
    const _acrylicDocRef = doc(
      this._fireStore,
      DbCollections.acrylics,
      acrylicId
    );
    return await setDoc(_acrylicDocRef, acrylicDTO);
  }

  // deleteDocumentType(documentTypeId: string): Observable<any> {
  async deleteAcrylic(acrylicId: string): Promise<void> {
    const _acrylicDocRef = doc(
      this._fireStore,
      DbCollections.acrylics,
      acrylicId
    );
    return await deleteDoc(_acrylicDocRef);
  }

  // Accessories
  registerAccessory(
    accessoryDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._accessoriesRef, accessoryDTO);
  }

  getAccessories(): Observable<Array<IAccessory>> {
    return collectionData(this._accessoriesRef, {
      idField: 'id',
    }) as Observable<Array<IAccessory>>;
  }

  async editAccessory(accessoryId: string, accessoryDTO: any): Promise<void> {
    const _accessoryDocRef = doc(
      this._fireStore,
      DbCollections.accessories,
      accessoryId
    );
    return await setDoc(_accessoryDocRef, accessoryDTO);
  }

  async deleteAccessory(accessoryId: string): Promise<void> {
    const _accessoryDocRef = doc(
      this._fireStore,
      DbCollections.accessories,
      accessoryId
    );
    return await deleteDoc(_accessoryDocRef);
  }

  //Profiles
  registerProfile(
    profileDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._profilesRef, profileDTO);
  }

  getProfiles(): Observable<Array<IProfile>> {
    return collectionData(this._profilesRef, {
      idField: 'id',
    }) as Observable<Array<IProfile>>;
  }

  async editProfile(profileId: string, profileDTO: any): Promise<void> {
    const _profileDocRef = doc(
      this._fireStore,
      DbCollections.profiles,
      profileId
    );
    return await setDoc(_profileDocRef, profileDTO);
  }

  async deleteProfile(profileId: string): Promise<void> {
    const _profileDocRef = doc(
      this._fireStore,
      DbCollections.profiles,
      profileId
    );
    return await deleteDoc(_profileDocRef);
  }

  //glasses
  registerGlass(glassDTO: any): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._glassesRef, glassDTO);
  }

  getGlasses(): Observable<Array<IGlass>> {
    return collectionData(this._glassesRef, {
      idField: 'id',
    }) as Observable<Array<IGlass>>;
  }

  async editGlass(glassId: string, glassDTO: any): Promise<void> {
    const _glassDocRef = doc(this._fireStore, DbCollections.glasses, glassId);
    return await setDoc(_glassDocRef, glassDTO);
  }

  async deleteGlass(glassId: string): Promise<void> {
    const _glassDocRef = doc(this._fireStore, DbCollections.glasses, glassId);
    return await deleteDoc(_glassDocRef);
  }
}
