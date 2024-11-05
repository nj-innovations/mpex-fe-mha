import { Component, OnInit } from '@angular/core';
import { AltLoginService } from './alt-login.service';
import { ActivatedRoute } from '@angular/router';
import { IloginResponse } from '../index/requests/IloginResponse';
import { IndexService } from '../index/index.service';
import { AlertsService } from '../core/alerts/alerts.service';

@Component({
	selector: 'app-alt-login',
	standalone: true,
	imports: [],
	templateUrl: './alt-login.component.html',
	styleUrl: './alt-login.component.css'
})
export class AltLoginComponent implements OnInit {

	constructor(public altLoginService: AltLoginService, private route: ActivatedRoute, public indexService: IndexService,
		public alertsService: AlertsService
	) { }

	ngOnInit() {
		const token = this.route.snapshot.params['token']!;
		this.altLoginService.login(token).subscribe({
			next: (response: IloginResponse) => {
				this.indexService.SuccessfulLogin(response);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}
}
