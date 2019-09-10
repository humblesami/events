import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot) {                
        var cuser = window['current_user'].cookie;
        if(cuser && cuser.token)
        {
            return true;
        }
        else
        {
            // console.log(3344);
            window['loader'].hide('route/'+route.routeConfig.path);
            window['auth_js'].go_to_login();
            return false;
        }
    }
}