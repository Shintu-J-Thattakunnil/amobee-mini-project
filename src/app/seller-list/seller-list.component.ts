import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SellerService } from '../shared/seller.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Seller, SellerFormControl } from '../shared/seller.model';
import { MatDialog } from '@angular/material/dialog';
import { SellerDialogComponent } from '../seller-dialog';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { DealValidation } from '../shared/seller.validation';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'seller-list', 
    templateUrl: 'seller-list.component.html' , 
    styleUrls: ['./seller-list.component.scss'] 
})

export class SellerListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  sellersList : Seller[];
  displayedColumns: string[] = ['sellerName', 'currencies', 'offices', 'isBidded', 'isGuaranteed', 'action'];
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private sellerService: SellerService, 
      private firestore: AngularFirestore,
      public dialog: MatDialog, private formBuilder: FormBuilder,
      private toastr: ToastrService){}

  ngOnInit() {

      this.sellerService.getSellers().subscribe(actionArray => {
          this.sellersList = actionArray.map(item => {
              return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
              } as Seller;
          });
          this.dataSource = new MatTableDataSource(this.sellersList);
          this.dataSource.paginator = this.paginator;
      });
  }

  onEdit(seller: Seller): void{
    let sellerFormControl: SellerFormControl = {
      sellerName  : new FormControl(seller.sellerName, Validators.required),
      currencies  : new FormControl(seller.currencies, Validators.required),
      offices  : new FormControl(seller.offices, Validators.required),
      dealType  : new FormGroup({ 
              isBidded : new FormControl(seller.isBidded),
              isGuaranteed : new FormControl(seller.isGuaranteed)}, {validators : DealValidation}),
      contactName  : new FormControl(seller.contactName),
      contactEmail : new FormControl(seller.contactEmail, Validators.email),
      id  : seller.id
    };
    this.sellerService.sellerForm = this.formBuilder.group(sellerFormControl);
  }

  openDialog(seller: Seller): void {

      const dialogRef = this.dialog.open(SellerDialogComponent, {
        width: '250px',
        data: seller
      });

      dialogRef.afterClosed().subscribe(result => {
        
        if (result && result.event == 'delete'){
          this.sellerService.deleteSeller(result.id).then(res => {
            this.toastr.success('Seller deleted', 'Firebase');
          })
          .catch(error => {
            this.toastr.error('Error on delete', 'Firebase');
          });
        };
        
      });
    };
  }
  

  