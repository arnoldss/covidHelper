import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

export class FormValidators {
  public static readonly CURP_REGEX = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

  public static confirmPassword(pwdFormGroup: FormGroup): ValidationErrors {
    const password = pwdFormGroup.get('password').value;
    const pwdConfirm = pwdFormGroup.get('pwdConfirm').value;
    if (password === pwdConfirm) {
      return null;
    } else {
      return {
        passwordsNotTheSame: { message: "Passwords don't match" },
      };
    }
  }

  public static maxDigitLength(maxLength: number) {
    return (control: AbstractControl) => {
      const value: number = control.value;
      if (value != null) {
        const length = value.toString().length;
        if (length > maxLength) {
          return { maxDigitLength: true };
        }
      } else {
        return null;
      }
    };
  }

  public static minDigitLength(minLength: number) {
    return (control: AbstractControl) => {
      const value: number = control.value;
      if (value != null) {
        const length = value.toString().length;
        if (length < minLength) {
          return { minDigitLength: true };
        }
      } else {
        return null;
      }
    };
  }
}
