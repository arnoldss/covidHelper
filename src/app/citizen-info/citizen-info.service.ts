import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PeriodicElement } from './citizen-info.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Citizen } from '../shared/models/citizen.model';

@Injectable({
  providedIn: 'root'
})
export class CitizenInfoService {

  private API_URL= environment.API_URL;

   constructor(    private httpClient:HttpClient) {
  }


  registerServiceWorker(username, password, role) {
    
    if (role) { role = "500"} else { role = ""}
    return this.httpClient.post<any>(this.API_URL + '/user',{username,password, role}).pipe(
     map(
       userData => {
        return userData;
       }
     )

    );
  }

  getCitizens() {
    
    return this.httpClient.get<any>(this.API_URL + '/person').pipe(
     map(
       userData => {
        return userData;
       }
     )

    );
  }

  updateCitizen(id: string, citizen: Citizen) {
    
    return this.httpClient.patch<any>(this.API_URL + '/person?id='+id, citizen).pipe(
     map(
       userData => {
        return userData;
       }
     )

    );
  }

  getCitizen(id) {
    
    return this.httpClient.get<any>(this.API_URL + '/person?=' + id).pipe(
     map(
       userData => {
        return userData;
       }
     )

    );
  }

}
