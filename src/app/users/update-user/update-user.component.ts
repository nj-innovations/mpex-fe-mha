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
import { MentorProjectsComponent } from '../mentor-projects/mentor-projects.component';
import { IgetClientAdminUserDropdown, IgetRoleDropdown } from '../requests/IgetClientAdminUserDropdown';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { AvatarUploadComponent } from '../../core/avatar-upload/avatar-upload.component';

@Component({
	selector: 'app-update-user',
	standalone: true,
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
	dropdowns!: IgetClientAdminUserDropdown;
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
			'is_mentor': new FormControl(null, null),
			'is_preceptor': new FormControl(null, null),
			'open_to_precepting': new FormControl(null, null),
			'open_to_mentoring': new FormControl(null, null),
			'is_student': new FormControl(null, null),
		});

		this.id = parseInt(this.route.snapshot.params['id']!);
		this.usersService.getDropdowns().subscribe({
			next: (_data: IgetClientAdminUserDropdown) => {
				this.dropdowns = _data;
				this.rolesRS = _data.roles;
				for(const element of _data['sectors']){
					this.sectorCheckBoxes.push({'label': element.sector_name, 'value': element.sector_id, 'checked': false})
				}
				this.usersService.getUser(this.id).subscribe({
					next: (data: IusersRequest) => {
						this.user = data;
						const is_student = (this.user.is_student == 'Y') ? true : false;
						const is_mentor = (this.user.is_mentor == 'Y') ? true : false;
						const is_preceptor = (this.user.is_preceptor == 'Y') ? true : false;
						const open_to_precepting = (this.user.open_to_precepting == 'Y') ? true : false;
						const open_to_mentoring = (this.user.open_to_mentoring == 'Y') ? true : false;

						let patchValues = {
							'fname': this.user.fname, 'lname': this.user.lname, 'email': this.user.email,
							'organization': this.user.organization,  'city': this.user.city,
							'state': this.user.state, 'linkedin': this.user.linkedin,
							'role': this.user.role_id, 'is_mentor': is_mentor, 'is_student': is_student,
							'is_preceptor': is_preceptor, 'open_to_precepting': open_to_precepting,
							'open_to_mentoring': open_to_mentoring
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
			'role_id': this.usersForm.value.role, 'is_student': 'N', 'is_mentor': 'N', 'is_preceptor': 'N',
			'open_to_mentoring': 'N', 'open_to_precepting': 'N', 'sectors': ''
		}

		if(this.usersForm.value.is_mentor){
			putVars['is_mentor'] = 'Y';
		}
		if(this.usersForm.value.is_student){
			putVars['is_student'] = 'Y';
		}
		if(this.usersForm.value.is_preceptor){
			putVars['is_preceptor'] = 'Y';
		}
		if(this.usersForm.value.open_to_mentoring){
			putVars['open_to_mentoring'] = 'Y';
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