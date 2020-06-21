import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserAdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;
  isAdmin = false;

  constructor(private router: Router,
              private admin: UserAdminService) { }

  ngOnInit() {

  }

  signOut() {

  }
}
