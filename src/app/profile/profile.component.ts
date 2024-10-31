import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../core/alerts/alerts.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmitButtonComponent } from '../core/submit-button/submit-button.component';
import { ProfileService } from './profile.service';
import { IgetProfileResponse } from './requests/IgetProfileResponse';
import { LocalStorageService } from '../core/local-storage.service';
import { AvatarService } from '../core/service/avatar.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, SubmitButtonComponent, FontAwesomeModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
	profileForm!: FormGroup;
	avatarForm!: FormGroup;
	avatarFile!: File;

	constructor(private profileService: ProfileService, private alertsService: AlertsService,
		public avatarService: AvatarService, public sessionsSerivce: LocalStorageService
	) {}

	ngOnInit() {
		this.profileForm = new FormGroup({
			'fname': new FormControl(null, Validators.required),
			'lname': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email])
		});
		this.avatarForm = new FormGroup({
			'avatar_file': new FormControl(null, Validators.required),
		});
		this.profileService.getProfile().subscribe({
			next: (data: IgetProfileResponse) => {
				const patchValues = {
					'fname': data['fname'],
					'lname': data['lname'],
					'email': data['email']
				}
				this.profileForm.patchValue(patchValues);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				//this.isPageLoading = false;
			}
		});
	}

	saveAvatar(){
		this.profileService.uploadAvatar(this.avatarFile).subscribe({
			next: (data: any) => {
				this.avatarService.setAvatarLink(data.link);
				this.sessionsSerivce.setValue('avatar_link', data.link);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
			}
		});
	}

	onFilechange(event: any) {
		this.avatarFile = event.target.files[0]
	}
}
