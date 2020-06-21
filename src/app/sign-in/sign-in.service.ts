import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


export class User{
  constructor(
    public status:string,
     ) {}
  
}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private API_URL= environment.API_URL;


  constructor(
    private httpClient:HttpClient
  ) { 
     }

     authenticate(username, password) {
      return this.httpClient.post<any>(this.API_URL + '/authenticate',{username,password}).pipe(
       map(
         userData => {
          sessionStorage.setItem('username',username);
          sessionStorage.setItem('role',userData.role);
          let tokenStr= 'Bearer '+userData.token;
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('userID', userData.userId);

          
          return userData;
         }
       )
  
      );
    }
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username') 
    //console.log(!(user === null))
    console.log(user)
    return !(user === null)
  
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}