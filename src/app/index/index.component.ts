import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../core/alerts/alerts.service';
import { HeaderService } from '../core/header/header.service';
import { IndexService } from './index.service';
import { SubmitButtonComponent } from '../core/submit-button/submit-button.component';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IloginResponse } from './requests/IloginResponse';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AlertsComponent } from '../core/alerts/alerts.component';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { LocalStorageService } from '../core/local-storage.service';
import { IdleTimerService } from '../core/idle-timer/idle-timer.service';

@Component({
	selector: 'app-index',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule,
		NgbCollapseModule, NgbAlertModule, AlertsComponent
	],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
	loginForm!: FormGroup;
	resetForm!: FormGroup;
	faUser = faUser;
	faKey = faKey;
	navbarCollapsed = false;
	visiblePasswordReset = false;

	constructor(public headerService: HeaderService, public alertsService: AlertsService,
		public route: ActivatedRoute, public indexService: IndexService,
		public resetService: ResetPasswordService, public sessionService: LocalStorageService,
		public idleTimerService: IdleTimerService) { }

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			'email': new FormControl('', [Validators.required, Validators.email]),
			'password': new FormControl('', Validators.required)
		});
		this.resetForm = new FormGroup({
			'resetEmail': new FormControl('', [Validators.required, Validators.email])
		});

		switch (this.route.snapshot.queryParams['msg']) {
			case '1':
				this.alertsService.addErrorAlert('Your session has expired, please log in again');
				break;
			case '2':
				this.alertsService.addErrorAlert('Invalid username/password, please log in');
				break;
			case '3':
				if(this.sessionService.getToken() !== ''){
					this.indexService.logout().subscribe({
						next: () => {
							this.sessionService.clear();
							this.idleTimerService.stopTimers();
							this.alertsService.addSuccessAlert('Logout Complete');
						},
						error: (error: string) => {
							this.alertsService.addErrorAlert(error);
						}
					});
				}
				break;
				case '4':
					this.alertsService.addErrorAlert('You are not authenicated');
					break;
				default:
				break;
		}
	}

	submit() {
		this.alertsService.clearAlerts();
		this.indexService.login({'email':this.loginForm?.value.email, 'password':this.loginForm?.value.password}).subscribe({
			next: (response: IloginResponse) => {
				this.indexService.SuccessfulLogin(response);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	forgotPassword(): void{
		this.alertsService.clearAlerts();
		this.visiblePasswordReset = !this.visiblePasswordReset;
	}

	confirmResetPassword(){
		this.alertsService.clearAlerts();
		this.resetService.forgotPassword(this.resetForm?.value.resetEmail).subscribe({
			next: (response: IstringMessageResponse) => {
				this.alertsService.addSuccessAlert(response.message);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}
}
