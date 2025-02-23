import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsComponent } from '../core/alerts/alerts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../core/alerts/alerts.service';
import { ResetPasswordService } from './reset-password.service';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';

@Component({
    selector: 'app-reset-password',
    imports: [CommonModule, ReactiveFormsModule, AlertsComponent],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
	resetForm!: FormGroup;
	validToken = false;
	successfulChange = false;

	constructor(public route: ActivatedRoute, public resetService: ResetPasswordService,
		public alertsService: AlertsService, public router: Router) { }

	ngOnInit() {
		this.resetService.verifyToken(this.route.snapshot.params['token']).subscribe({
			next: () => {
				this.validToken = true;
			},
			error : (error: Error) => {
				this.alertsService.addErrorAlert(error.message);
			}
		});

		const ptn = '^(?=.*\\d)(?=.*[@$!%*#?&^_])(?=.*[a-z])(?=.*[A-Z]).{8,}$';
		this.resetForm = new FormGroup({
			'password': new FormControl('', [Validators.required, Validators.pattern(ptn)]),
			'password2': new FormControl('', [Validators.required, Validators.pattern(ptn)])
		});
	}

	submit(){
		this.alertsService.clearAlerts();
		const postVars = {
			'password': this.resetForm.value.password,
			'password_confirmation': this.resetForm.value.password2,
			'token': this.route.snapshot.params['token']
		}
		this.resetService.resetPassword(postVars).subscribe({
			next: (data: IstringMessageResponse) => {
				this.alertsService.addSuccessAlert(data.message);
				this.successfulChange = true;
			},
			error : (error: Error) => {
				this.alertsService.addErrorAlert(error.message);
			}
		});
	}

	backHome(): void {
		this.router.navigate(['/']);
	}
}
