import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
	export class AuthGuardService  {
	constructor(public sessions: LocalStorageService, private router: Router, public route: ActivatedRoute) { }
	
	isAuthorized(role: string | string[]) : boolean | UrlTree {
		const currentRole = this.sessions.getValue('role');
		let authorized: boolean;
        
		if (Array.isArray(role)) {
			authorized = currentRole !== null && role.includes(currentRole);
        } else {
            authorized = currentRole === role;
        }

		if(!authorized){
			return this.router.parseUrl('/forbidden');
		}
		return authorized;
	}
}