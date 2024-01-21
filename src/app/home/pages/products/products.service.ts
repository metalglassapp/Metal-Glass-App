import { Injectable } from '@angular/core';
import {
  CollectionReference,
  arrayRemove,
  arrayUnion,
  collectionData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { DbCollections } from '../../../constants/db-collections';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../../../../interfaces/product.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
// import { getStorage, ref } from '@angular/fire/storage';
import {
  getStorage,
  ref,
  uploadString,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import { getDownloadURL } from '@angular/fire/storage';
import { IPhoto } from '../../../../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // private _storareRef = firebase.app().storage().ref();
  private _storareRef = ref(getStorage(), 'products');

  private _productsRef: CollectionReference = collection(
    this._fireStore,
    DbCollections.products
  );

  private _db = getFirestore();

  constructor(private _fireStore: Firestore) {}

  registerProduct(
    productDTO: any
  ): Promise<DocumentReference<any, DocumentData>> {
    return addDoc(this._productsRef, productDTO);
  }

  getProducts(): Observable<Array<IProduct>> {
    // return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
    return collectionData(this._productsRef, {
      idField: 'id',
    }) as Observable<Array<IProduct>>;
  }

  async editProduct(productId: string, productDTO: any): Promise<void> {
    const _productDocRef = doc(
      this._fireStore,
      DbCollections.products,
      productId
    );
    return await setDoc(_productDocRef, productDTO);
  }

  // deleteDocumentType(documentTypeId: string): Observable<any> {
  async deleteProduct(productId: string): Promise<void> {
    const _productDocRef = doc(
      this._fireStore,
      DbCollections.products,
      productId
    );
    return await deleteDoc(_productDocRef);
  }

  async deletePhoto(location: string): Promise<void> {
    return await deleteObject(ref(getStorage(), location));
  }

  async removePhotoItem(product: IProduct, photo: IPhoto): Promise<void> {
    const _productDocRef = doc(
      this._db,
      DbCollections.products,
      product.id ?? ''
    );
    return await updateDoc(_productDocRef, {
      // photos: arrayUnion(downloadURL),
      // name: Date.now() + '_' + selectedPhotos[i].name,
      photos: arrayRemove(photo),
    });
  }

  async filter(name: any): Promise<any> {
    const productsCollectionRef = collection(this._db, DbCollections.products);
    let q: any = null;
    const products: Array<IProduct | DocumentData | any> = [];
    q = query(
      productsCollectionRef,
      // where('names', 'array-contains', filterDto[keyName])
      // where('clientName', '==', filterDto[keyName])
      where('name', '==', name)
    );
    const productsQueryResult = await getDocs(q);
    productsQueryResult.forEach((product) => {
      products.push(product.data());
    });
    return products;
  }

  // async uploadFile(name: string, imgBase64: any): Promise<any> {
  async uploadFile(
    selectedPhotos: Array<any>,
    product: IProduct
  ): Promise<any> {
    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     // const progress =
    //     //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     switch (snapshot.state) {
    //       case 'paused':
    //         break;
    //       case 'running':
    //         break;
    //     }
    //   },
    //   (error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case 'storage/unauthorized':
    //         // User doesn't have permission to access the object
    //         break;
    //       case 'storage/canceled':
    //         // User canceled the upload
    //         break;

    //       // ...

    //       case 'storage/unknown':
    //         // Unknown error occurred, inspect error.serverResponse
    //         break;
    //     }
    //   },
    //   () => {
    //     // Upload completed successfully, now we can get the download URL
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //     });
    //   }
    // );

    const photos: Array<string> = [];
    for (let i = 0; i < selectedPhotos.length; i++) {
      const photoName = `${Date.now() + '_' + selectedPhotos[i].name}`;
      const refProd = ref(getStorage(), `products/${photoName}`);
      // `products/${Date.now() + '_' + selectedPhotos[i].name}`
      uploadString(
        // ref(
        //   getStorage(),
        //   `products/${Date.now() + '_' + selectedPhotos[i].name}`
        // ),
        refProd,
        selectedPhotos[i].imageData,
        'data_url'
      ).then((uploadResponse) => {
        getDownloadURL(refProd).then(async (downloadURL) => {
          const _productDocRef = doc(
            this._db,
            DbCollections.products,
            product.id ?? ''
          );
          // return await updateDoc(_productDocRef, { photos: product.photos });
          return await updateDoc(_productDocRef, {
            // photos: arrayUnion(downloadURL),
            // name: Date.now() + '_' + selectedPhotos[i].name,
            photos: arrayUnion({
              name: photoName,
              collection: 'products',
              url: downloadURL,
            }),
          }).then((itemAdd) => {});
        });
      });
      // const uploadTask = uploadBytesResumable(
      //   ref(
      //     getStorage(),
      //     `products/${Date.now() + '_' + selectedPhotos[i].name}`
      //   ),
      //   selectedPhotos[i].imageData
      // );
      // uploadTask.on(
      //   'state_changed',
      //   (snapshot) => {
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     // const progress =
      //     //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     switch (snapshot.state) {
      //       case 'paused':
      //         break;
      //       case 'running':
      //         break;
      //     }
      //   },
      //   (error) => {
      //     // A full list of error codes is available at
      //     // https://firebase.google.com/docs/storage/web/handle-errors
      //     switch (error.code) {
      //       case 'storage/unauthorized':
      //         // User doesn't have permission to access the object
      //         break;
      //       case 'storage/canceled':
      //         // User canceled the upload
      //         break;

      //       // ...

      //       case 'storage/unknown':
      //         // Unknown error occurred, inspect error.serverResponse
      //         break;
      //     }
      //   },
      //   () => {
      //     // Upload completed successfully, now we can get the download URL
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       photos.push(downloadURL);
      //       // product.photos.push(downloadURL);
      //       product.photos.push('downloadURL');
      //       const _productDocRef = doc(
      //         this._db,
      //         DbCollections.products,
      //         product.id ?? ''
      //       );
      //       // return await updateDoc(_productDocRef, { photos: product.photos });
      //       return await updateDoc(_productDocRef, {
      //         photos: arrayUnion(downloadURL),
      //       }).then((itemAdd) => {
      //       });
      //     });
      //   }
      // );
    }
    // urls.length > 0 ? this.editProduct(product.id ?? '', product) : false;
    // const productDto = { ...product, photos };
    // const productDto = { ...product };
    // return this.editProduct(product.id ?? '', { ...product, photos })
    // return this.editProduct(product.id ?? '', product);
    // this._fireStore,
    const _productDocRef = doc(
      this._db,
      DbCollections.products,
      product.id ?? ''
    );
    return await getDoc(_productDocRef);
    return await updateDoc(_productDocRef, { photos: product.photos });
    // return await setDoc(_productDocRef, { ...product, photos });
    // return await setDoc(_productDocRef, product);
  }
}
