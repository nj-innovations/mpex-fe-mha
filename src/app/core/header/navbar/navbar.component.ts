import { Component, effect } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NavbarService } from './navbar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faBell, faUser, faKey, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faGear, faSignOut, faUser as faUserRegular } from '@fortawesome/pro-regular-svg-icons';
import { LocalStorageService } from '../../local-storage.service';
import { AvatarUploadService } from '../../avatar-upload/avatar-upload.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [NgbCollapseModule, RouterModule, FontAwesomeModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent {
	faUser = faUser;
	faKey = faKey;
	faBars = faBars;
	faBell = faBell;
	faUserRegular = faUserRegular;
	faGear = faGear;
	faSignOut = faSignOut;
	faHandshake = faHandshake;
	navbarCollapsed = false;
	avatarImage = '';
	userName = '';

	constructor(public navbarService: NavbarService,  public sessionStorage: LocalStorageService,
		public avatarService: AvatarUploadService) {
		
		this.avatarImage = this.sessionStorage.getValue('avatar_link') ?? '';
		this.userName = (this.sessionStorage.getValue('fname') ?? '') + ' ' + (this.sessionStorage.getValue('lname') ?? '');

		effect(() => {
			const avatarLink = this.avatarService.getAvatarLink();
			if(avatarLink.length < 10){
				this.avatarImage = this.sessionStorage.getValue('avatar_link') ?? '';
			} else {
				this.avatarImage = avatarLink;
			}
		});
	}
}
