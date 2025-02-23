import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubmitButtonService } from './submit-button.service';
import { AlertsService } from '../alerts/alerts.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-submit-button',
    imports: [CommonModule],
    templateUrl: './submit-button.component.html',
    styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent implements OnInit {
	@Input() disabled = false; // default value if none is passed
	@Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
	@Input() label = '';
	@Input() myClass = '';
	@Input() glyph = '';
	id  = '';
	isLoading = false;

	constructor(public submitButtonService: SubmitButtonService, public alertsService: AlertsService) {
	}

	ngOnInit() {
		this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		this.submitButtonService.isLoadingSubject.subscribe(
			(data: any) => {
				if (!data['loading']) {
					this.submitButtonService.removeActiveButton(this.id);
				}
				this.isLoading = data['loading'];
			}
		);
	}

	isActiveButton() {
		const active = this.submitButtonService.isActiveButton(this.id);
		if (active > -1) { return true; } else { return false; }
	}

	pushButton($event: Event) {
		this.alertsService.clearAlerts();
		this.submitButtonService.addActiveButton(this.id);
		this.clickEvent.emit($event);
	}
}
