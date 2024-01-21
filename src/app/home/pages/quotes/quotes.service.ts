import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { DbCollections } from '../../../constants/db-collections';
import { Observable } from 'rxjs';
import { IQuote } from '../../../../interfaces/quote.interface';
import { IAccessory } from '../../../../interfaces/accessory.interface';
import { IProfile } from '../../../../interfaces/profile.interface';
import { IClient } from '../../../../interfaces/client.interface';
import { IGlass } from '../../../../interfaces/glass.interface';
import { IAcrylic } from '../../../../interfaces/acrylic.interface';
import { IAditionalReference } from '../../../../interfaces/aditional-reference.interface';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private _quotesRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.quotes
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
  private _acrylicsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.acrylics
  );

  private _clientsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.clients
  );

  private _aditionaleReferencesRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.aditionalReference
  );

  private _db = getFirestore();

  constructor(private _fireStore: Firestore) {}

  registerQuote(quoteDTO: any): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._quotesRef, quoteDTO);
  }

  getQuotes(): Observable<Array<IQuote>> {
    // const dto: any = {
    //   reference: 'Fija',
    //   description: 'Sin descripcion',
    // };
    // addDoc(this._aditionaleReferencesRef, dto);
    // return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
    return collectionData(this._quotesRef, {
      idField: 'id',
    }) as Observable<Array<IQuote>>;
  }

  getAccessories(): Observable<Array<IAccessory>> {
    return collectionData(this._accessoriesRef, {
      idField: 'id',
    }) as Observable<Array<IAccessory>>;
  }

  getProfiles(): Observable<Array<IProfile>> {
    return collectionData(this._profilesRef, {
      idField: 'id',
    }) as Observable<Array<IProfile>>;
  }

  getGlasses(): Observable<Array<IGlass>> {
    return collectionData(this._glassesRef, {
      idField: 'id',
    }) as Observable<Array<IGlass>>;
  }

  getAcrylics(): Observable<Array<IAcrylic>> {
    return collectionData(this._acrylicsRef, {
      idField: 'id',
    }) as Observable<Array<IAcrylic>>;
  }

  getClients(): Observable<Array<IClient>> {
    // return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
    return collectionData(this._clientsRef, {
      idField: 'id',
    }) as Observable<Array<IClient>>;
  }

  async getOneClient(clientId: string): Promise<any> {
    const _clientDocRef = doc(this._fireStore, DbCollections.clients, clientId);
    // return await setDoc(_clientDocRef, clientDTO);
    return await getDoc(_clientDocRef);
  }

  getAditionalReferences(): Observable<Array<IAditionalReference>> {
    return collectionData(this._aditionaleReferencesRef, {
      idField: 'id',
    }) as Observable<Array<IAditionalReference>>;
  }

  async editQuote(quoteId: string, quoteDTO: any): Promise<void> {
    const _quoteDocRef = doc(this._fireStore, DbCollections.quotes, quoteId);
    return await setDoc(_quoteDocRef, quoteDTO);
  }

  // deleteDocumentType(documentTypeId: string): Observable<any> {
  async deleteQuote(quoteId: string): Promise<void> {
    const _quoteDocRef = doc(this._fireStore, DbCollections.quotes, quoteId);
    return await deleteDoc(_quoteDocRef);
  }

  async filtQuotes(filterDto: any): Promise<any> {
    const quotesCollectionRef = collection(this._db, DbCollections.quotes);
    let q: any = null;
    const quotes: Array<IQuote | DocumentData | any> = [];
    q = query(
      quotesCollectionRef,
      // where('names', 'array-contains', filterDto[keyName])
      // where('clientName', '==', filterDto[keyName])
      where('clientName', '==', filterDto.clientName)
    );
    const quotesQueryResult = await getDocs(q);
    quotesQueryResult.forEach((quote) => {
      quotes.push(quote.data());
    });
    // Object.keys(filterDto).forEach(async (keyName) => {
    //   if (keyName === 'clientName') {
    //     q = query(
    //       quotesCollectionRef,
    //       // where('names', 'array-contains', filterDto[keyName])
    //       where('clientName', '==', filterDto[keyName])
    //     );
    //     const quotesQueryResult = await getDocs(q);
    //     quotesQueryResult.forEach((quote) => {
    //       quotes.includes(quote.data())
    //         ? console.log('ya existe')
    //         : quotes.push(quote.data());
    //     });
    //   }
    //   if (keyName === 'others') {
    //     q = query(
    //       quotesCollectionRef,
    //       where('others', '==', filterDto[keyName])
    //     );
    //     const quotesQueryResult = await getDocs(q);
    //     quotesQueryResult.forEach((quote) => {
    //       quotes.includes(quote.data())
    //         ? console.log('ya existe')
    //         : quotes.push(quote.data());
    //     });
    //   }
    //   if (keyName === 'extraPercentage') {
    //     q = query(
    //       quotesCollectionRef,
    //       where('extraPercentage', '==', filterDto[keyName])
    //     );
    //     const quotesQueryResult = await getDocs(q);
    //     quotesQueryResult.forEach((quote) => {
    //       quotes.includes(quote.data())
    //         ? console.log('ya existe')
    //         : quotes.push(quote.data());
    //     });
    //   }
    //   if (keyName === 'generalValue') {
    //     q = query(
    //       quotesCollectionRef,
    //       where('generalValue', '==', filterDto[keyName])
    //     );
    //     const quotesQueryResult = await getDocs(q);
    //     quotesQueryResult.forEach((quote) => {
    //       quotes.includes(quote.data())
    //         ? console.log('ya existe')
    //         : quotes.push(quote.data());
    //     });
    //   }
    // });
    return quotes;
  }
}
