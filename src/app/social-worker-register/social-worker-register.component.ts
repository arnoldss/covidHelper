import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from '../shared/form-validators';
import { SocialWorker } from '../shared/models/social-worker.model';
import { CitizenInfoService } from '../citizen-info/citizen-info.service';

@Component({
  selector: 'app-social-worker-register',
  templateUrl: 'social-worker-register.component.html',
  styleUrls: ['social-worker-register.component.scss'],
})
export class SocialWorkerRegisterComponent implements OnInit {
  formSocialWorker: FormGroup;

  constructor(private fb: FormBuilder, private citizenInfoServ: CitizenInfoService) {}

  ngOnInit() {
    this.formSocialWorker = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      isAdmin: [null, Validators.required],
    });
  }

  registerSocialWorker() {
    const email = this.formSocialWorker.get('email').value;
    const password = this.formSocialWorker.get('password').value;
    let admin = this.formSocialWorker.get('isAdmin').value;
    if (admin === null) {
      admin = '';
    }

    this.citizenInfoServ.registerServiceWorker(email, password, admin).subscribe(
      (data) => {
        this.formSocialWorker.reset();
        alert('Usuario agregado');
      },
      (error) => {
        alert('A ocurrido un error');
      }
    );
  }
}
