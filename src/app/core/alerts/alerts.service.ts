import { Injectable } from '@angular/core';
import { alertModel } from './alerts.model';

@Injectable({
	providedIn: 'root'
})
export class AlertsService {
	alerts: alertModel[] = [];

	addSuccessAlert(msg: string) {
		this.alerts.push(
			new alertModel(
				'success', 'Success', msg
			)
		);
	}

	addErrorAlert(msg: string) {
		msg = msg.toString().replace(/Error: /ig, '');
		this.alerts.push(
			new alertModel(
				'danger', 'Error', msg
			)		
		);
	}

	close(alert: alertModel) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
		//console.log('aaaa');
	}

	clearAlerts() {
		this.alerts = [];
	}
}
