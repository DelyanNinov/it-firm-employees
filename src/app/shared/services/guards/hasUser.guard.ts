import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HasUserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user$.pipe(
      map((userData) => {
        if (!userData) {
          return true;
        }
        return !userData.email ? true : this.router.createUrlTree(['form']);
      })
    );
  }
}
