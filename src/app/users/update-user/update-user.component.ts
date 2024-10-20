import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilePen, faFileCirclePlus, faSpinner, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faFileXmark } from '@fortawesome/pro-regular-svg-icons';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IusersRequest } from '../requests/IuserRequest';
import { AlertsService } from '../../core/alerts/alerts.service';
import { PermissionsService } from '../../core/permissions.service';
import { UsersService } from '../users.service';

@Component({
	selector: 'app-update-user',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink],
	templateUrl: './update-user.component.html',
	styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
	usersForm!: FormGroup;
	id = 0;
	user!: IusersRequest;
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	faSpinner = faSpinner;
	clientModalRef?: NgbModalRef;
	deleteClientModalRef?: NgbModalRef;
	createClientModalRef?: NgbModalRef;
	//dropdowns!: IgetSuperAdminUserDropdown;
	isPageLoading = 1;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;
	degrees: string[] = [];
	titles: string[] = [];

	constructor(public usersService: UsersService, private alertsService: AlertsService,
		private route: ActivatedRoute, public permissions: PermissionsService, private router: Router) {
	}

	ngOnInit() {
		this.usersForm = new FormGroup({
			'fname': new FormControl(null, Validators.required),
			'lname': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'organization': new FormControl(null, null),
			'new_title': new FormControl(null, null),
			'new_degree': new FormControl(null, null),
			'city': new FormControl(null, null),
			'state': new FormControl(null, null),
			'linkedin': new FormControl(null, null)
		});
		this.id = parseInt(this.route.snapshot.params['id']!);
		this.usersService.getUser(this.id).subscribe({
			next: (data: IusersRequest) => {
				this.user = data;
				let patchValues = {
					'fname': this.user.fname, 'lname': this.user.lname, 'email': this.user.email,
					'organization': this.user.organization,  'city': this.user.city,
					'state': this.user.state, 'linkedin': this.user.linkedin
				}
				if(this.user.title !== null){
					this.titles = this.user.title;
				}
				if(this.user.degree !== null){
					this.degrees = this.user.degree;
				}

				this.usersForm.patchValue(patchValues);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading++;
			}
		});
		/* this.usersService.getDropdowns().subscribe({
			next: (data: IgetSuperAdminUserDropdown) => {
				this.dropdowns = data;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading++;
			}
		}); */
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
		let putVars = {
			'email': this.usersForm.value.email, 'fname': this.usersForm.value.fname, 'lname': this.usersForm.value.lname,
			'organization': this.usersForm.value.organization, 'title': JSON.stringify(this.titles),
			'degree': JSON.stringify(this.degrees), 'state': this.usersForm.value.state,
			'city': this.usersForm.value.city, 'linkedin': this.usersForm.value.linkedin
		}
	
		/* this.updateUserService.update(this.id, putVars).subscribe({
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
		}); */		
	}
}
