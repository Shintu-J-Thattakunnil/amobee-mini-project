import { FormControl, Validators, FormGroup } from "@angular/forms";
import { DealValidation } from "./seller.validation";

export class SellerFormControl{
    sellerName : FormControl = new FormControl('', Validators.required);
    currencies : FormControl = new FormControl([], Validators.required);
    offices : FormControl = new FormControl([], Validators.required);
    dealType : FormGroup = new FormGroup({ 
            isBidded : new FormControl(false),
            isGuaranteed : new FormControl(false)}, {validators : DealValidation});
    contactName : FormControl = new FormControl('');
    contactEmail : FormControl = new FormControl('', Validators.email);
    id : string = '';
}

export class Seller{
    id : string;
    sellerName : string;
    currencies : string[];
    offices : string[];
    isBidded : boolean;
    isGuaranteed : boolean;
    contactName : string;
    contactEmail : string;
}