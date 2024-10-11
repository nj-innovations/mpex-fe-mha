import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IgetSuperAdminUserDropdown, SuperAdminUserDropdownClient,
	SuperAdminUserDropdownRole, SuperAdminUserDropdownSector } from '../../requests/IgetSuperAdminUserDropdown';
import { SuperAdminUserClient } from '../../requests/IgetSuperAdminUserResponse';
import { ClientLinksServiceService } from '../client-links-service.service';

@Component({
	selector: 'app-update-user-client-modal',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
	templateUrl: './update-user-client-modal.component.html',
	styleUrl: './update-user-client-modal.component.css'
})
export class UpdateUserClientModalComponent implements OnInit {
	@Input() client!: SuperAdminUserClient;
	@Input() dropdowns!: IgetSuperAdminUserDropdown
	clientForm!: FormGroup;
	clientsRS: SuperAdminUserDropdownClient[] = [];
	rolesRS: SuperAdminUserDropdownRole[] = [];
	sectorsRS: SuperAdminUserDropdownSector[] = [];
	foundClient: SuperAdminUserDropdownClient | undefined;
	alertMessage = '';
	
	constructor(public activeModal: NgbActiveModal, private clientLinkService: ClientLinksServiceService) {
	}
	
	ngOnInit() {
		const is_alumni = (this.client.is_alumni == 'Y') ? true : false;
		const is_student = (this.client.is_student == 'Y') ? true : false;
		const is_mentor = (this.client.is_mentor == 'Y') ? true : false;
		const is_preceptor = (this.client.is_preceptor == 'Y') ? true : false;
		const open_to_precepting = (this.client.open_to_precepting == 'Y') ? true : false;
		const open_to_mentoring = (this.client.open_to_mentoring == 'Y') ? true : false;
		let selectedSectors: string[] = [];

		for(const el of this.client.sectors){
			selectedSectors.push(el.sector_id);
		}
		this.clientsRS = this.dropdowns.clients;
		this.rolesRS = this.dropdowns.roles;
		this.sectorsRS = this.getClientSectors(this.client.id);
		this.clientForm = new FormGroup({
			'client': new FormControl(this.client.client_name, Validators.required),
			'role': new FormControl(this.client.role, Validators.required),
			'sectors': new FormControl(selectedSectors, Validators.required),
			'is_mentor': new FormControl(is_mentor, null),
			'is_preceptor': new FormControl(is_preceptor, null),
			'open_to_precepting': new FormControl(open_to_precepting, null),
			'open_to_mentoring': new FormControl(open_to_mentoring, null),
			'is_student': new FormControl(is_student, null),
			'is_alumni': new FormControl(is_alumni, null)
		});
	}

	Save(){
		let sectors: [] = [];
		if(this.clientForm.value.sectors !== null){
			sectors = this.clientForm.value.sectors;
		}
		let putvars = {
			'role_id': this.clientForm.value.role, 'sectors': sectors, 'is_alumni': 'N',
			'is_student': 'N', 'is_mentor': 'N', 'is_preceptor': 'N',
			'open_to_mentoring': 'N', 'open_to_precepting': 'N'
		}
		if(this.clientForm.value.is_mentor){
			putvars['is_mentor'] = 'Y';
		}
		if(this.clientForm.value.is_student){
			putvars['is_student'] = 'Y';
		}
		if(this.clientForm.value.is_alumni){
			putvars['is_alumni'] = 'Y';
		}
		if(this.clientForm.value.is_preceptor){
			putvars['is_preceptor'] = 'Y';
		}
		if(this.clientForm.value.open_to_mentoring){
			putvars['open_to_mentoring'] = 'Y';
		}
		if(this.clientForm.value.open_to_precepting){
			putvars['open_to_precepting'] = 'Y';
		}

		this.clientLinkService.updateClientUserLinks(this.client['user_client_link_id'], putvars).subscribe({
			next: (data: SuperAdminUserClient) => {
				this.activeModal.close(data);
			},
			error: (error: string) => {
				this.alertMessage = error;
			},
			complete: () => {}
		});
	}

	getClientSectors(id: string): SuperAdminUserDropdownSector[] {
		let foundClient: SuperAdminUserDropdownClient | undefined;
		let sectors: SuperAdminUserDropdownSector[] = [];
		foundClient = this.dropdowns.clients.find((c) => c.id == id);
		if(foundClient !== undefined){
			if(foundClient.sectors.length > 0){
				sectors = foundClient.sectors;
			}
		}
		return sectors;
	}

	closeAlert(): void {
		this.alertMessage = '';
	}
}
