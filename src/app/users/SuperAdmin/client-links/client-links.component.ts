import { Component, Input, OnInit } from '@angular/core';
import { SuperAdminUserClient } from '../requests/IgetSuperAdminUserResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { PermissionsService } from '../../../core/permissions.service';
import { SuperAdminUsersService } from '../super-admin-users.service';
import { UpdateUserService } from '../update-user/update-user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faCircleMinus, faFilePen, faFileXmark, faFileCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { DeleteUserClientModalComponent } from './delete-user-client-modal/delete-user-client-modal.component';
import { IgetSuperAdminUserDropdown } from '../requests/IgetSuperAdminUserDropdown';
import { CreateUserClientModalComponent } from './create-user-client-modal/create-user-client-modal.component';
import { UpdateUserClientModalComponent } from './update-user-client-modal/update-user-client-modal.component';

@Component({
	selector: 'app-client-links',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './client-links.component.html',
	styleUrl: './client-links.component.css'
})
export class ClientLinksComponent implements OnInit {
	@Input() clientLinks:SuperAdminUserClient[] = [];
	@Input() dropdowns!: IgetSuperAdminUserDropdown;
	@Input() user_id = 0;
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	updateClientModalRef?: NgbModalRef;
	deleteClientModalRef?: NgbModalRef;
	createClientModalRef?: NgbModalRef;
	isPageLoading = 0;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;
	clientIds: string[] = [];

	constructor(public usersService: SuperAdminUsersService, private alertsService: AlertsService,
		private route: ActivatedRoute, public permissions: PermissionsService, private router: Router,
		private modalService: NgbModal, public updateUserService: UpdateUserService) {
	}
	
	ngOnInit() {
		for(const element of this.clientLinks){
			this.clientIds.push(element['id']);
		}
	}

	updateClientLink(client: SuperAdminUserClient){
		this.updateClientModalRef = this.modalService.open(UpdateUserClientModalComponent, {
			ariaLabelledBy: 'Update Clients',
			size: 'xl'
		});
		this.updateClientModalRef.componentInstance.client = client;
		this.updateClientModalRef.componentInstance.dropdowns = this.dropdowns;
		this.updateClientModalRef.result.then(
			(result: SuperAdminUserClient) => {
				const selectedClientId = client.id;
				const selectedClientIndex = this.clientLinks.findIndex((c) => c.id == selectedClientId);
				this.clientLinks[selectedClientIndex] = result;
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);
	}

	deleteClientLink(client: SuperAdminUserClient){
		this.deleteClientModalRef = this.modalService.open(DeleteUserClientModalComponent, {
			ariaLabelledBy: 'Delete Client Link',
			size: 'lg'
		});
		this.deleteClientModalRef.componentInstance.client_link_id = client['user_client_link_id'];
		this.deleteClientModalRef.componentInstance.client_name = client['client_name'];

		this.deleteClientModalRef.result.then(
			() => {
				const selectedClientIndex = this.clientLinks.findIndex((c) => c.id == client['id']);
				this.clientLinks.splice(selectedClientIndex, 1);
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);
	}

	createClientLink(){
		this.createClientModalRef = this.modalService.open(CreateUserClientModalComponent, {
			ariaLabelledBy: 'Create Client',
			size: 'xl'
		});		
		this.createClientModalRef.componentInstance.dropdowns = this.dropdowns;
		this.createClientModalRef.componentInstance.user_id = this.user_id;
		this.createClientModalRef.componentInstance.clientIds = this.clientIds;

		this.createClientModalRef.result.then(
			(result: SuperAdminUserClient) => {
				this.clientLinks.push(result);
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);	
	}
}
