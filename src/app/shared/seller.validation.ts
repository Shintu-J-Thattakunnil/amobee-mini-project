import { FormControl, FormGroupDirective, NgForm, ValidatorFn, FormGroup } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class SellerErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

export const DealValidation: ValidatorFn = (fg: FormGroup) => {
  const isBidded = fg.get('isBidded').value;
  const isGuaranteed = fg.get('isGuaranteed').value;
  return isBidded || isGuaranteed ? null: { deal: true };
};