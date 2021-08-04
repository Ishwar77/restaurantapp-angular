import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  static numberValidate(c: FormControl): ValidationErrors {
    const numValue = Number(c.value);
    const isValid = !isNaN(numValue) ;
    const message = {
      'number' : {
        'message': 'Enter a Valid Number'
      }
    };
    return isValid ? null : message;
  }

}
