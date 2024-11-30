import { Component } from '@angular/core';
import { faUser as faUserRegular, faCircle, faUsers as faUsersRegular, faSignOut,
	faUsers as faUsersLight, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSitemap } from '@fortawesome/pro-thin-svg-icons';
import { faHandshake } from '@fortawesome/pro-light-svg-icons';
import { faHouse } from '@fortawesome/pro-regular-svg-icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { LocalStorageService } from '../local-storage.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [FontAwesomeModule, RouterModule, CommonModule, NgbCollapseModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
	animations: [
		trigger('rotateState', [
			state('default', style({ transform: 'rotate(0deg)' })),
			state('rotated', style({ transform: 'rotate(180deg)' })),
			transition('default => rotated', animate('0.25s ease-in-out')),
			transition('rotated => default', animate('0.25s ease-in-out'))
		])
	  ]
})
export class SidebarComponent {
	//faLinkRegular = faLinkRegular;
	faUserRegular = faUserRegular;
	faSignOut = faSignOut;
	faUsersRegular = faUsersRegular;
	faUsersLight = faUsersLight;
	faSitemap = faSitemap;
	faHandshake = faHandshake;
	faHouse = faHouse;
	faCircle = faCircle;
	faChevronUp = faChevronUp;
	activeLink: boolean[] = [];
	logoutModalRef?: NgbModalRef;
	usersIsCollapsed = true;
		
	constructor(private modalService: NgbModal, public sessionStorage: LocalStorageService) {
		this.activeLink = [false, true, true, true, true];
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
