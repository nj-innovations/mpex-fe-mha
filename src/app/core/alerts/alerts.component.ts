import { Component } from '@angular/core';
import { AlertsService } from './alerts.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { alertModel } from './alerts.model';

@Component({
    selector: 'app-alerts',
    imports: [NgbAlertModule],
    templateUrl: './alerts.component.html',
    styleUrl: './alerts.component.css'
})
export class AlertsComponent {

	constructor(public alertsService: AlertsService) { }
	
	close(alert: alertModel) {
		this.alertsService.close(alert);
	}
}
