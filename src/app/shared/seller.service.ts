import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Seller, SellerFormControl } from './seller.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class SellerService {
  
  sellerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) { 
     this.sellerForm = this.createSellerFormGroup(formBuilder)
  }

  createSellerFormGroup(formBuilder: FormBuilder){
    return  formBuilder.group(new SellerFormControl());
  }

  getSellers() {
    return this.firestore.collection('sellers').snapshotChanges();
  }

  createSeller(seller: Seller){
    delete seller.id
    return this.firestore.collection('sellers').add(seller);
  }

  updateSeller(seller: Seller){
    let id: string = seller.id
    delete seller.id;
    return this.firestore.doc('sellers/' + id).update(seller);
  }

  deleteSeller(sellerId: string){
    return this.firestore.doc('sellers/' + sellerId).delete();
  }

}