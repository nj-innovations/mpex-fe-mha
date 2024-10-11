import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientLinksServiceService } from '../client-links-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IgetSuperAdminUserDropdown, SuperAdminUserDropdownClient,
	SuperAdminUserDropdownRole, SuperAdminUserDropdownSector } from '../../requests/IgetSuperAdminUserDropdown';
import { SuperAdminUserClient } from '../../requests/IgetSuperAdminUserResponse';

@Component({
	selector: 'app-create-user-client-modal',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
	templateUrl: './create-user-client-modal.component.html',
	styleUrl: './create-user-client-modal.component.css'
})
export class CreateUserClientModalComponent {
	@Input() user_id = 0;
	@Input() dropdowns!: IgetSuperAdminUserDropdown
	@Input() clientIds: string[] = [];
	clientForm!: FormGroup;
	clientsRS: SuperAdminUserDropdownClient[] = [];
	rolesRS: SuperAdminUserDropdownRole[] = [];
	sectorsRS: SuperAdminUserDropdownSector[] = [];
	foundClient: SuperAdminUserDropdownClient | undefined;
	alertMessage = '';
		
	constructor(public activeModal: NgbActiveModal, private usersService: ClientLinksServiceService) {
	}

	ngOnInit() {
		this.clientsRS = this.dropdowns.clients;
		for(const element of this.clientIds){
			let i = this.clientsRS.findIndex((s) => {
				return s.id == element
			});
			if(i > -1){
				this.clientsRS.splice(i, 1);
			}
		}
		this.clientsRS = this.dropdowns.clients;
		this.rolesRS = this.dropdowns.roles;
		this.clientForm = new FormGroup({
			'client': new FormControl(null, Validators.required),
			'role': new FormControl(null, Validators.required),
			'sectors': new FormControl(null, null),
			'is_mentor': new FormControl(null, null),
			'is_preceptor': new FormControl(null, null),
			'open_to_precepting': new FormControl(null, null),
			'open_to_mentoring': new FormControl(null, null),
			'is_student': new FormControl(null, null),
			'is_alumni': new FormControl(null, null)
		});
	}

	changeClient(): void {
		const selectedValue = this.clientForm.value.client;
		let sectors: SuperAdminUserDropdownSector[] = [];
		if(selectedValue != ""){
			sectors = this.getClientSectors(selectedValue);
		}
		this.sectorsRS = sectors;
	}

	Save(): void {
		let sectors: [] = [];
		if(this.clientForm.value.sectors !== null){
			sectors = this.clientForm.value.sectors;
		}
		let postvars = {
			'client_id': this.clientForm.value.client, 'user_id': this.user_id,
			'role_id': this.clientForm.value.role, 'sectors': sectors, 'is_alumni': 'N',
			'is_student': 'N', 'is_mentor': 'N', 'is_preceptor': 'N',
			'open_to_mentoring': 'N', 'open_to_precepting': 'N'
		}
		if(this.clientForm.value.is_mentor){
			postvars['is_mentor'] = 'Y';
		}
		if(this.clientForm.value.is_student){
			postvars['is_student'] = 'Y';
		}
		if(this.clientForm.value.is_alumni){
			postvars['is_alumni'] = 'Y';
		}
		if(this.clientForm.value.is_preceptor){
			postvars['is_preceptor'] = 'Y';
		}
		if(this.clientForm.value.open_to_mentoring){
			postvars['open_to_mentoring'] = 'Y';
		}
		if(this.clientForm.value.open_to_precepting){
			postvars['open_to_precepting'] = 'Y';
		}
	
		this.usersService.createClientUserLinks(postvars).subscribe({
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
