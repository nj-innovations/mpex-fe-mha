import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilePen, faFileCirclePlus, faSpinner, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faFileXmark } from '@fortawesome/pro-regular-svg-icons';
import { IusersRequest } from '../requests/IuserRequest';
import { AlertsService } from '../../core/alerts/alerts.service';
import { PermissionsService } from '../../core/permissions.service';
import { UsersService } from '../users.service';
import { IgetClientAdminUserDropdown, IgetRoleDropdown } from '../requests/IgetClientAdminUserDropdown';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { AvatarUploadComponent } from '../../core/avatar-upload/avatar-upload.component';
import { MentorProjectsComponent } from '../../mentor-projects/mentor-projects.component';

@Component({
    selector: 'app-update-user',
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink, MentorProjectsComponent,
        AvatarUploadComponent
    ],
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
	usersForm!: FormGroup;
	id = 0;
	user!: IusersRequest;
	rolesRS: IgetRoleDropdown[] = [];
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	faSpinner = faSpinner;
	//dropdowns!: IgetClientAdminUserDropdown;
	isPageLoading = 0;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;
	degrees: string[] = [];
	titles: string[] = [];
	sectorCheckBoxes: sectorCheckBoxes[] = [];

	constructor(public usersService: UsersService, private alertsService: AlertsService,
		private route: ActivatedRoute, public permissions: PermissionsService, private router: Router) {
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
			'capacity': new FormControl(null, null)
		});

		this.id = parseInt(this.route.snapshot.params['id']!);
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
					this.sectorCheckBoxes.push({'label': element.sector_name, 'value': element.id, 'checked': false})
				}
				this.usersService.getUser(this.id).subscribe({
					next: (data: IusersRequest) => {
						this.user = data;
						const open_to_precepting = (this.user.open_to_precepting == 'Y') ? true : false;

						let patchValues = {
							'fname': this.user.fname, 'lname': this.user.lname, 'email': this.user.email,
							'organization': this.user.organization,  'city': this.user.city,
							'state': this.user.state, 'linkedin': this.user.linkedin,
							'role': this.user.role_id, 'open_to_precepting': open_to_precepting,
							'capacity': this.user.capacity
						}
						if(this.user.title !== null){
							this.titles = this.user.title;
						}
						if(this.user.degree !== null){
							this.degrees = this.user.degree;
						}
		
						this.usersForm.patchValue(patchValues);
						for(const s of data.sectors){
							let i = this.sectorCheckBoxes.findIndex((q) => {
								return q.value == s.sector_id;
							})
							this.sectorCheckBoxes[i].checked = true;
						}
					},
					error: (error: string) => {
						this.alertsService.addErrorAlert(error);
					},
					complete: () => {
						this.isPageLoading++;
					}
				});
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
		let putVars = {
			'email': this.usersForm.value.email, 'fname': this.usersForm.value.fname, 'lname': this.usersForm.value.lname,
			'organization': this.usersForm.value.organization, 'title': JSON.stringify(this.titles),
			'degree': JSON.stringify(this.degrees), 'state': this.usersForm.value.state,
			'city': this.usersForm.value.city, 'linkedin': this.usersForm.value.linkedin,
			'role_id': this.usersForm.value.role, 'open_to_precepting': 'N', 'sectors': '',
			'capacity': this.usersForm.value.capacity
		}
		if(this.usersForm.value.open_to_precepting){
			putVars['open_to_precepting'] = 'Y';
		}

		const sec = this.sectorCheckBoxes.filter((s) => {
			return s.checked;
		});
		for(const i of sec){
			sectors.push(i.value);
		}
		putVars['sectors'] = JSON.stringify(sectors);

		this.usersService.updateUser(this.id, putVars).subscribe({
			next: (data: IstringMessageResponse) => {
				this.router.navigate(
					['/users'],
					{ queryParams: { msg: 1 } }
				);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {}
		});
	}
}

export interface sectorCheckBoxes{
	'label': string;
	'value': string;
	'checked': boolean;
}