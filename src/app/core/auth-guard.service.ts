import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
	export class AuthGuardService  {
	constructor(public sessions: LocalStorageService, private router: Router, public route: ActivatedRoute) { }
	
	isAuthorized(role: string) : boolean | UrlTree {
		const authorized: boolean = this.sessions.getValue('role') == role;
		if(!authorized){
			return this.router.parseUrl('/forbidden');
		}
		return authorized;
	}
}