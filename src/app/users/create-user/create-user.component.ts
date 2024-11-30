import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faFilePen, faFileCirclePlus, faSpinner, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faFileXmark } from '@fortawesome/pro-regular-svg-icons';
import { IgetRoleDropdown, IgetClientAdminUserDropdown } from '../requests/IgetClientAdminUserDropdown';
import { IusersRequest } from '../requests/IuserRequest';
import { sectorCheckBoxes } from '../update-user/update-user.component';
import { Router, RouterLink } from '@angular/router';
import { AlertsService } from '../../core/alerts/alerts.service';
import { PermissionsService } from '../../core/permissions.service';
import { UsersService } from '../users.service';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-create-user',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink],
	templateUrl: './create-user.component.html',
	styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
	usersForm!: FormGroup;
	id = 0;
	user!: IusersRequest;
	rolesRS: IgetRoleDropdown[] = [];
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	faSpinner = faSpinner;
	isPageLoading = 0;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;
	degrees: string[] = [];
	titles: string[] = [];
	sectorCheckBoxes: sectorCheckBoxes[] = [];

	constructor(public usersService: UsersService, private alertsService: AlertsService,
		public permissions: PermissionsService, private router: Router) {
	}

	ngOnInit() {
		this.usersForm = new FormGroup({
			'fname': new FormControl(null, Validators.required),
			'lname': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'role': new FormControl(null, Validators.required),
			'organization': new FormControl(null, Validators.required),
			'new_title': new FormControl(null, null),
			'new_degree': new FormControl(null, null),
			'city': new FormControl(null, null),
			'state': new FormControl(null, null),
			'linkedin': new FormControl(null, null),
			'open_to_precepting': new FormControl(null, null),
			'location': new FormControl(null, null),
			'capacity': new FormControl(null, null)
		});

		this.usersService.getDropdowns().subscribe({
			next: (data: IgetClientAdminUserDropdown) => {
				this.rolesRS = data.roles.map((r) => {
					if(r.role_name == 'Mentor'){
						r.role_name = 'Preceptor';
					}
					if(r.role_name == 'Client Admin'){
						r.role_name = 'Admin';
					}
					return r;
				});
				for(const element of data['sectors']){
					this.sectorCheckBoxes.push({'label': element.sector_name, 'value': element.sector_id, 'checked': false})
				}
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading++;
			}
		});
	}

	deleteTitle(i: number): void {
		this.user.title.splice(i, 1);
	}

	deleteDegree(i: number): void {
		this.user.degree.splice(i, 1);
	}

	addTitle(): void {
		const d = this.usersForm.value.new_title;
		if(d != ''){
			this.titles.push(d);
		}
	}

	addDegree(): void {
		const d = this.usersForm.value.new_degree;
		if(d != ''){
			this.degrees.push(d);
		}
	}

	checkSectorCb(i: number)	{
		this.sectorCheckBoxes[i].checked = !this.sectorCheckBoxes[i].checked
	}	

	saveUser(): void {
		let sectors: string[] = [];
		let postVars = {
			'email': this.usersForm.value.email, 'fname': this.usersForm.value.fname, 'lname': this.usersForm.value.lname,
			'organization': this.usersForm.value.organization, 'title': JSON.stringify(this.titles),
			'degree': JSON.stringify(this.degrees), 'state': this.usersForm.value.state,
			'city': this.usersForm.value.city, 'linkedin': this.usersForm.value.linkedin,
			'role_id': this.usersForm.value.role, 'open_to_precepting': 'N', 'sectors': '',
			'capacity': this.usersForm.value.capacity, 'location': this.usersForm.value.location
		}

		if(this.usersForm.value.open_to_precepting){
			postVars['open_to_precepting'] = 'Y';
		}

		const sec = this.sectorCheckBoxes.filter((s) => {
			return s.checked;
		});
		for(const i of sec){
			sectors.push(i.value);
		}
		postVars['sectors'] = JSON.stringify(sectors);

		this.usersService.createUser(postVars).subscribe({
			next: (data: IstringMessageResponse) => {
				this.router.navigate(
					['/users'],
					{ queryParams: { msg: 2 } }
				);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {}
		});
	}
}
