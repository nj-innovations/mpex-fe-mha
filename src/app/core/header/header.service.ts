import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import {AlertsService} from '../alerts/alerts.service';
import {PermissionsService} from '../permissions.service';

@Injectable({providedIn: 'root'})
export class HeaderService {
	profileLink = '';
	
	constructor() {}

	getProfileLink(): string {
		return this.profileLink;
	}

}
