import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { from } from 'rxjs';
import { SellerMaterialModule} from './shared/ng-material.module'

import '../assets/styles';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { SellerFormComponent } from './seller-form'; 
import { SellerListComponent } from './seller-list';
import { SellerService } from './shared/seller.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { SellerDialogComponent } from './seller-dialog';

@NgModule({
    declarations: [
        AppComponent,
        SellerFormComponent,
        SellerListComponent,
        SellerDialogComponent
    ],
    entryComponents: [SellerDialogComponent],
    imports: [
        BrowserModule, 
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SellerMaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        ToastrModule.forRoot()
    ],
    providers: [SellerService, AngularFirestore,  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}