import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../core/alerts/alerts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { IgetProfileResponse } from './requests/IgetProfileResponse';
import { LocalStorageService } from '../core/local-storage.service';
import { AvatarUploadComponent } from '../core/avatar-upload/avatar-upload.component';
import { AvatarUploadService } from '../core/avatar-upload/avatar-upload.service';
import { environment } from '../../environments/environment';
import { IupdateProfileRequest } from './requests/IupdateProfileRequest';
import { Router } from '@angular/router';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserDegreeComponent } from '../core/user-degree/user-degree.component';
import { UserTitleComponent } from '../core/user-title/user-title.component';

@Component({
    selector: 'app-profile',
    imports: [CommonModule, ReactiveFormsModule, AvatarUploadComponent, FontAwesomeModule,
		UserTitleComponent, UserDegreeComponent
	],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
	profileForm!: FormGroup;
	isPageLoading = true;
	degrees: string[] = [];
	titles: string[] = [];
	mentor_role_id = environment.mentor_role_id;
	role_id = '';
	faSpinner = faSpinner;

	constructor(private profileService: ProfileService, private alertsService: AlertsService,
		public avatarService: AvatarUploadService, public sessionsSerivce: LocalStorageService,
		private router: Router
	) {}

	ngOnInit() {
		this.profileForm = new FormGroup({
			'fname': new FormControl(null, Validators.required),
			'lname': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'organization': new FormControl(null, Validators.required),
			'linkedin': new FormControl(null, null),
			'open_to_mentoring': new FormControl(null, null)
		});
		this.profileService.getProfile().subscribe({
			next: (data: IgetProfileResponse) => {
				const open_to_mentoring = (data.open_to_mentoring == 'Y') ? true : false;
				const patchValues = {
					'fname': data.fname, 'lname': data.lname,
					'email': data.email, 'organization': data.organization,
					'linkedin': data.linkedin, 'open_to_mentoring': open_to_mentoring
				}
				this.profileForm.patchValue(patchValues);
				this.role_id = data.role_id
				if(data.title !== null){
					this.titles = data.title;
				}
				if(data.degree !== null){
					this.degrees = data.degree;
				}
				this.isPageLoading = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
				this.isPageLoading = false;
			}
		});
	}

	onNotifyUserTitles(message: string[]){
		this.titles = message;
	}

	onNotifyUserDegrees(message: string[]){
		this.degrees = message;
	}

	saveUser(): void {
		let putVars: IupdateProfileRequest = {
			'email': this.profileForm.value.email, 'fname': this.profileForm.value.fname, 'lname': this.profileForm.value.lname,
			'organization': this.profileForm.value.organization, 'linkedin': this.profileForm.value.linkedin,
			'open_to_mentoring': 'N', 'degree': JSON.stringify(this.degrees) , 'title': JSON.stringify(this.titles)
		}
		if(this.role_id == this.mentor_role_id){
			if(this.profileForm.value.open_to_mentoring){
				putVars['open_to_mentoring'] = 'Y';
			}
		} else {
			delete putVars.open_to_mentoring;
		}

		this.profileService.updateUser(putVars).subscribe({
			next: (data: IstringMessageResponse) => {
				this.alertsService.addSuccessAlert('Profile Saved');
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {}
		});
	}
}
