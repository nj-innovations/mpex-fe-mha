import { Component } from '@angular/core';
import { faUser as faUserRegular, faUsers as faUsersLight } from '@fortawesome/pro-regular-svg-icons';
import { faUsers as faUsersRegular, faLink as faLinkRegular } from '@fortawesome/pro-regular-svg-icons';
import { faSignOut, faHouse } from '@fortawesome/pro-regular-svg-icons';
import { faSitemap } from '@fortawesome/pro-thin-svg-icons';
import { faHandshake } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { LocalStorageService } from '../local-storage.service';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [FontAwesomeModule, RouterModule, CommonModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
	faLinkRegular = faLinkRegular;
	faUserRegular = faUserRegular;
	faSignOut = faSignOut;
	faUsersRegular = faUsersRegular;
	faUsersLight = faUsersLight;
	faSitemap = faSitemap;
	faHandshake = faHandshake;
	faHouse = faHouse;
	activeLink: boolean[] = [];
	logoutModalRef?: NgbModalRef;
		
	constructor(private modalService: NgbModal, public sessionStorage: LocalStorageService) {
		this.activeLink = [false, true, true, true, true, true];
	}
	
	clickLink(j :number): void {
		const m = this.activeLink.length;
		for (let i = 0; i < m;  i++) {
			this.activeLink[i] = (i == j) ? false : true;
		}
	}

	Logout(): void {
		this.logoutModalRef = this.modalService.open(LogoutModalComponent, {
			ariaLabelledBy: 'Logout',
			size: 'md'
		});
	}

	hasRole(role: string): boolean {
		return this.sessionStorage.hasRole(role);
	}
}
