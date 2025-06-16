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
	environment = environment;

	constructor(public indexService: IndexService,public alertsService: AlertsService,
		public sessionsSerivce: LocalStorageService, public router: Router,
		public altViewService: AlternateViewService
	) {}

	alternateView(role_id: string): void {
		this.isPageLoading = true;
		this.altViewService.AuthChangeRole(role_id).subscribe({
			next: (response: IloginResponse) => {
				let i = 0;
				this.sessionsSerivce.setValue('role', response.role);
				switch (role_id){
					case environment.student_role_id:
						i = 1
						break;
					case environment.mentor_role_id:
						i = 2
						break;
					case environment.client_admin_role_id:
						i = 3;
						break
				}
				this.altViewService.setFooter(i);
				this.router.navigate(['/', 'home']);
				this.isPageLoading = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
				this.isPageLoading = false;
			}
		});
	}
}