import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

interface Admin {
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserAdminService {
  constructor() { }

  getAdmins() {

  }
}
