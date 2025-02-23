import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../alerts/alerts.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';
import { AvatarUploadService } from './avatar-upload.service';

@Component({
    selector: 'app-avatar-upload',
    imports: [CommonModule, ReactiveFormsModule, NgbAlertModule],
    templateUrl: './avatar-upload.component.html',
    styleUrl: './avatar-upload.component.css'
})
export class AvatarUploadComponent implements OnInit {
	@Input() user_id: number = 0;
	@Input() api_part: number = 0;
	successMessage = '';
	errorMessage = '';
	avatarForm!: FormGroup;
	avatarFile!: File;

	constructor(public alertsService: AlertsService, public avatarService: AvatarUploadService,
		public sessionsSerivce: LocalStorageService) {}

	ngOnInit() {
		this.avatarForm = new FormGroup({
			'avatar_file': new FormControl(null, Validators.required),
		});
	}
	
	saveAvatar(){
		this.successMessage = '';
		this.errorMessage = '';
		this.avatarService.uploadAvatar(this.avatarFile, this.user_id, this.api_part).subscribe({
			next: (data: any) => {
				if(this.user_id == 0){
					this.avatarService.setAvatarLink(data.link);
					this.sessionsSerivce.setValue('avatar_link', data.link);
				}
				this.successMessage = 'File upload successful'
			},
			error: (error: string) => {
				this.errorMessage = error.toString();
			},
			complete: () => {
			}
		});
	}

	onFilechange(event: any) {
		this.avatarFile = event.target.files[0]
	}

	closeSuccessAlert(){
		this.successMessage = '';
	}

	closeErrorAlert(){
		this.errorMessage = '';
	}
}
