import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from '../models/user';

@Injectable()
export class AdminGuard implements CanActivate {
    currentUser: User;
    
    constructor(private router: Router) { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.currentUser && this.currentUser.type === "admin") {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}