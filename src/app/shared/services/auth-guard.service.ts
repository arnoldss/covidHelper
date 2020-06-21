import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SignInService } from 'src/app/sign-in/sign-in.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private signInService: SignInService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.signInService.isUserLoggedIn())
      return true;

    this.router.navigate(['sign-in']);
    return false;

  }

}