import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Seller } from "../shared/seller.model";

@Component({
    selector: 'seller-dialog',
    templateUrl: 'seller-dialog.component.html',
  })


export class SellerDialogComponent {

    seller: Seller;
    
    constructor(public dialogRef: MatDialogRef<SellerDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: Seller) {
        this.seller = data;
    }
    
    onDelete() : void{
        this.dialogRef.close({event: 'delete', id: this.seller.id});
    }

    onNoClick(): void {
        this.dialogRef.close({});
    }

}
