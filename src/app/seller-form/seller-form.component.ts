import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SellerService } from '../shared/seller.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Seller, SellerFormControl } from '../shared/seller.model';
import { SellerErrorStateMatcher } from '../shared/seller.validation';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'seller-form', 
    templateUrl: 'seller-form.component.html' , 
    styleUrls: ['./seller-form.component.scss'] 
})


export class SellerFormComponent implements OnInit {

  sellerForm : FormGroup
  matcher = new SellerErrorStateMatcher();
  currencyList: string[] = ['USD', 'GBR', 'EUR'];
  officeList: string[] = ['Australia', 'France', 'Italy', 'Japan', 'United Kingdom', 'United States'];

  constructor(public sellerService: SellerService, private toastr: ToastrService){
   
  }
  
  ngOnInit(){}
  
  onCancel() {
    this.sellerService.sellerForm.reset()
    this.sellerService.sellerForm.markAsPristine();
    this.sellerService.sellerForm.markAsUntouched();
  }

  onSubmit() {
    let sellerData: Seller = {
      id : this.sellerService.sellerForm.value.id,
      sellerName: this.sellerService.sellerForm.value.sellerName,
      currencies: this.sellerService.sellerForm.value.currencies,
      offices: this.sellerService.sellerForm.value.offices,
      isBidded: this.sellerService.sellerForm.value.dealType.isBidded,
      isGuaranteed: this.sellerService.sellerForm.value.dealType.isGuaranteed,
      contactName: this.sellerService.sellerForm.value.contactName,
      contactEmail: this.sellerService.sellerForm.value.contactEmail
    };

    if (sellerData.id && sellerData.id.length > 0) {
      this.sellerService.updateSeller(sellerData) .then(res => {
        this.toastr.success('Updated Successfully!', 'Firebase');
      })
      .catch(error => {
        this.sellerService.createSeller(sellerData);
      });
    }
    else {
      this.sellerService.createSeller(sellerData).then(res => {
        this.toastr.success('Seller Added', 'Firebase');
      })
      .catch(error => {
        this.toastr.error('Error on update', 'Firebase');
      });
    }
    this.onCancel()
  }

}