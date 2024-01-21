import { Inject, Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  endAt,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from '@angular/fire/firestore';
import { DbCollections } from '../../../constants/db-collections';
import { Observable } from 'rxjs';
import { IClient } from '../../../../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private _clientsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.clients
  );

  private _db = getFirestore();

  constructor(private _fireStore: Firestore) {}

  registerClient(
    clientDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._clientsRef, clientDTO);
  }

  getClients(): Observable<Array<IClient>> {
    // return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
    return collectionData(this._clientsRef, {
      idField: 'id',
    }) as Observable<Array<IClient>>;
  }

  async editClient(clientId: string, clientDTO: any): Promise<void> {
    const _clientDocRef = doc(this._fireStore, DbCollections.clients, clientId);
    return await setDoc(_clientDocRef, clientDTO);
  }

  // deleteDocumentType(documentTypeId: string): Observable<any> {
  async deleteClient(clientId: string): Promise<void> {
    const _clientDocRef = doc(this._fireStore, DbCollections.clients, clientId);
    return await deleteDoc(_clientDocRef);
  }

  // async filter(names: string): Promise<void> {
  filter(names: string): any {
    // return this.clientsCollection.ref
    //   .orderBy('names')
    //   .startAt(names)
    //   .endAt(names + '\uf8ff');

    const clientsCollectionRef = collection(this._db, DbCollections.clients);
    // const q = query(
    //   clientsCollectionRef,
    //   orderBy('names'),
    //   startAt(names),
    //   endAt(names + '\uf8ff')
    // );
    // const q = query(
    //   clientsCollectionRef,
    //   // orderBy('names'),
    //   // startAt(names),
    //   // endAt(names + '\uf8ff'),
    //   where('names', '==', [names, 'Jesus Antonio'])
    //   // where('names', '<=', names)
    // );
    // const clientsResult = await getDocs(q);
    // clientsResult.forEach((client) => {
    // });

    const clients: Array<IClient | DocumentData> = [];
    const namesList: Array<string> = ['Johan Leandro', 'Jesus Antonio'];
    namesList.forEach(async (name) => {
      const q = query(clientsCollectionRef, where('names', '==', name));
      const clientsResult = await getDocs(q);
      clientsResult.forEach((client) => {
        clients.push(client.data());
      });
    });
    return clients;
  }
}
