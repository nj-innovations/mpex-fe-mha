import { Component } from '@angular/core';
import { IndexService } from '../index/index.service';
import { IloginResponse } from '../index/requests/IloginResponse';
import { AlertsService } from '../core/alerts/alerts.service';
import { LocalStorageService } from '../core/local-storage.service';
import { environment } from '../../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AlternateViewService } from './alternate-view.service';

@Component({
	selector: 'app-alternate-view',
	imports: [FontAwesomeModule],
	templateUrl: './alternate-view.component.html',
	styleUrl: './alternate-view.component.css'
})
export class AlternateViewComponent {
	isPageLoading = false;
	faSpinner = faSpinner;

	constructor(public indexService: IndexService,public alertsService: AlertsService,
		public sessionsSerivce: LocalStorageService, public router: Router,
		public altViewService: AlternateViewService
	) {}

	alternateView(i: number): void {
		this.isPageLoading = true;
		this.indexService.AuthenicatedUser().subscribe({
			next: (response: IloginResponse) => {
				if(response.role == environment.client_admin_role_id){
					if(i == 1){
						this.sessionsSerivce.setValue('role', environment.student_role_id);
					}
					if(i == 2){
						this.sessionsSerivce.setValue('role', environment.mentor_role_id);
					}
					if(i == 3){
						this.sessionsSerivce.setValue('role', environment.client_admin_role_id);
					}
					this.altViewService.setFooter(i);
					this.router.navigate(['/', 'home']);
				} else {
					this.alertsService.addErrorAlert('You are not authorized to access this page');
				}
				this.isPageLoading = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
				this.isPageLoading = false;
			}
		});
	}
}