import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from '../shared/form-validators';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  socialWorkerForm: FormGroup;
  citizenStatusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signInService: SignInService
  ) {}

  ngOnInit() {
    this.socialWorkerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.citizenStatusForm = this.fb.group({
      curp: [null, [Validators.required, Validators.pattern(FormValidators.CURP_REGEX)]],
    });
  }

  onCitizenSubmit() {
    const curp: string = this.citizenStatusForm.value.curp;
    this.router.navigate(['/citizen', curp]);
  }

  onSocialWorkerSubmit() {
    const email = this.socialWorkerForm.get('email').value;
    const password = this.socialWorkerForm.get('password').value;
    this.signInService.authenticate(email, password).subscribe(
      (data) => {
        if (data.role === '500') {
          this.router.navigate(['/citizen-info']);
        } else {
          this.router.navigate(['/citizen-register']);
        }
      },
      (error) => {}
    );
  }
}
