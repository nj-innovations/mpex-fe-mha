import { Component } from '@angular/core';
import { faUser as faUserRegular, faCircle, faUsers as faUsersRegular, faSignOut,
	faUsers as faUsersLight, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSitemap } from '@fortawesome/pro-thin-svg-icons';
import { faHandshake } from '@fortawesome/pro-light-svg-icons';
import { faHouse, faDiagramProject } from '@fortawesome/pro-regular-svg-icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { LocalStorageService } from '../local-storage.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IstringMessageResponse } from '../requests/IstringMessageResponse';
import { HttpClient } from '@angular/common/http';
import { IexitAdminResponse, SidebarService } from './sidebar.service';
import { AlertsService } from '../alerts/alerts.service';

@Component({
    selector: 'app-sidebar',
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
	faDiagramProject = faDiagramProject;
	activeLink: boolean[] = [];
	logoutModalRef?: NgbModalRef;
	usersIsCollapsed = true;
	masquerade = '';
		
	constructor(private modalService: NgbModal, public sessionStorage: LocalStorageService, public http: HttpClient,
		public sidebarService: SidebarService, private alertsService: AlertsService
	) {
		this.activeLink = [false, true, true, true, true];
		this.masquerade = this.sessionStorage.getMasquerade();
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

	adminExit(): void {
		this.sidebarService.getExitAdminToken().subscribe({
			next: (data: IexitAdminResponse) => {
				this.sessionStorage.logout().subscribe({
					next: () => {
						(window.location as any) = data['url'];
					},
					error: (error: string) => {
						this.alertsService.addErrorAlert(error);
					}
				});	
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}
}
