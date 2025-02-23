import { Component, OnInit } from '@angular/core';
import { IdleTimerService } from './idle-timer.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-idle-timer',
    imports: [],
    templateUrl: './idle-timer.component.html',
    styleUrl: './idle-timer.component.css'
})
export class IdleTimerComponent implements OnInit {

	constructor(public idleTimerService: IdleTimerService){}
	
	ngOnInit() {
		this.idleTimerService.stopTimers();
		if(environment.idleTime > 0){
			this.idleTimerService.startTimers();
		}
	}
	
}
