import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class PermissionsService {

	constructor(public LocalStorageService: LocalStorageService) {}

	public matchesPermission(permissions: number[] | number){
		let valid = false;
		const user_permissions = this.LocalStorageService.getPermissions();
		if(user_permissions !== null){
			if(Array.isArray(permissions)){
				const m = permissions.length;
				for (let i = 0; i < m; i++) {
					if (user_permissions.includes(permissions[i])) {
						valid = true;
						break;
					}			
				}
			} else {
				valid = (user_permissions.includes(permissions))
			}
		}
		return valid;
	}
}