import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MentorProjectsComponent } from '../mentor-projects/mentor-projects.component';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus, faCircleMinus, faFilePen, faFileXmark, faFileCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { PermissionsService } from '../../../core/permissions.service';
import { IstringMessageResponse } from '../../../core/requests/IstringMessageResponse';
import { IgetSuperAdminUserDropdown } from '../requests/IgetSuperAdminUserDropdown';
import { IgetSuperAdminUserResponse } from '../requests/IgetSuperAdminUserResponse';
import { SuperAdminUsersService } from '../super-admin-users.service';
import { UpdateUserService } from './update-user.service';
import { ClientLinksComponent } from '../client-links/client-links.component';

@Component({
	selector: 'app-update-user',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule,
		RouterLink, MentorProjectsComponent, ClientLinksComponent],
	templateUrl: './update-user.component.html',
	styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
	usersForm!: FormGroup;
	id = 0;
	user!: IgetSuperAdminUserResponse;
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	faSpinner = faSpinner;
	clientModalRef?: NgbModalRef;
	deleteClientModalRef?: NgbModalRef;
	createClientModalRef?: NgbModalRef;
	dropdowns!: IgetSuperAdminUserDropdown;
	isPageLoading = 0;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;
	degrees: string[] = [];
	titles: string[] = [];

	constructor(public usersService: SuperAdminUsersService, private alertsService: AlertsService,
		private route: ActivatedRoute, public permissions: PermissionsService, private router: Router,
		public updateUserService: UpdateUserService) {
	}

	ngOnInit() {
		this.usersForm = new FormGroup({
			'fname': new FormControl(null, Validators.required),
			'lname': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'organization': new FormControl(null, null),
			'new_title': new FormControl(null, null),
			'new_degree': new FormControl(null, null),
			'is_super_admin': new FormControl(null, null),
			'city': new FormControl(null, null),
			'state': new FormControl(null, null),
			'linkedin': new FormControl(null, null)
		});
		this.id = parseInt(this.route.snapshot.params['id']!);
		this.usersService.getUser(this.id).subscribe({
			next: (data: IgetSuperAdminUserResponse) => {
				this.user = data;
				let patchValues = {
					'fname': this.user.fname, 'lname': this.user.lname, 'email': this.user.email,
					'organization': this.user.organization, 'is_super_admin': false,
					'city': this.user.city, 'state': this.user.state, 'linkedin': this.user.linkedin
				}
				if(this.user.title !== null){
					this.titles = this.user.title;
				}
				if(this.user.degree !== null){
					this.degrees = this.user.degree;
				}
				/* patchValues['is_mentor'] = (this.user.is_mentor == 'Y') ? true : false;
				patchValues['is_preceptor'] = (this.user.is_preceptor == 'Y') ? true : false;
				patchValues['is_intern'] = (this.user.is_intern == 'Y') ? true : false;
				patchValues['open_to_mentoring'] = (this.user.open_to_mentoring == 'Y') ? true : false;
				patchValues['open_to_precepting'] = (this.user.open_to_precepting == 'Y') ? true : false; */
				patchValues['is_super_admin'] = (this.user.is_super_admin == 'Y') ? true : false;

				this.usersForm.patchValue(patchValues);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading++;
			}
		});
		this.usersService.getDropdowns().subscribe({
			next: (data: IgetSuperAdminUserDropdown) => {
				this.dropdowns = data;
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

	saveUser(): void {
		const is_super_admin = (this.usersForm.value.is_super_admin) ? 'Y' : 'N';

		let putVars = {
			'email': this.usersForm.value.email, 'fname': this.usersForm.value.fname, 'lname': this.usersForm.value.lname,
			'organization': this.usersForm.value.organization, 'title': JSON.stringify(this.titles),
			'degree': JSON.stringify(this.degrees), 'is_super_admin': is_super_admin, 'state': this.usersForm.value.state,
			'city': this.usersForm.value.city, 'linkedin': this.usersForm.value.linkedin
		}
	
		this.updateUserService.update(this.id, putVars).subscribe({
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
