import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { PermissionsService } from '../../../core/permissions.service';
import { SuperAdminUserDropdownClient, SuperAdminUserDropdownRole, IgetSuperAdminUserDropdown } from '../requests/IgetSuperAdminUserDropdown';
import { SuperAdminUsersService } from '../super-admin-users.service';
import { CreateUserService } from './create-user.service';
import { IcreateUserResponse } from './requests/IcreateUserResponse';

@Component({
	selector: 'app-create-user',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink],
	templateUrl: './create-user.component.html',
	styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
	usersForm!: FormGroup;
	isPageLoading = 0;
	faSpinner = faSpinner;
	clientsRS: SuperAdminUserDropdownClient[] = [];
	rolesRS: SuperAdminUserDropdownRole[] = [];
	
	constructor(public createUsersService: CreateUserService, private alertsService: AlertsService,
		public permissions: PermissionsService, private router: Router,
		public usersService: SuperAdminUsersService) {
	}

	ngOnInit() {
		this.usersForm = new FormGroup({
			'fname': new FormControl(null, Validators.required),
			'lname': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'organization': new FormControl(null, null),
			'client': new FormControl(null, Validators.required),
			'role': new FormControl(null, Validators.required)
		});
		
		this.usersService.getDropdowns().subscribe({
			next: (data: IgetSuperAdminUserDropdown) => {
				this.clientsRS = data.clients;
				this.rolesRS = data.roles;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading++;
			}
		});
	}

	saveUser(): void {
		let postVars = {
			'email': this.usersForm.value.email, 'fname': this.usersForm.value.fname,
			'lname': this.usersForm.value.lname, 'organization': this.usersForm.value.organization,
			'client_id': this.usersForm.value.client, 'role_id': this.usersForm.value.role
		}

		this.createUsersService.create(postVars).subscribe({
			next: (data: IcreateUserResponse) => {
				this.router.navigate(
					['/users/update/' + data.id]
				);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {}
		});
	}
}
