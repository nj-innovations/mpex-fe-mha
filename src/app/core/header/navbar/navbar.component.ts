import { Component, effect, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NavbarService } from './navbar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular} from '@fortawesome/pro-regular-svg-icons';
import { faGear } from '@fortawesome/pro-regular-svg-icons';
import { faSignOut } from '@fortawesome/pro-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../local-storage.service';
import { AvatarService } from '../../service/avatar.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [NgbCollapseModule, RouterModule, FontAwesomeModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
	faUser = faUser;
	faKey = faKey;
	faBars = faBars;
	faBell = faBell;
	faUserRegular = faUserRegular;
	faGear = faGear;
	faSignOut = faSignOut;
	navbarCollapsed = false;
	avatarImage = '';
	userName = '';

	constructor(public navbarService: NavbarService,  public sessionStorage: LocalStorageService,
		public avatarService: AvatarService) {
		
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

	ngOnInit() {}
}
