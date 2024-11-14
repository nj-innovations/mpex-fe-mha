import { Component, OnInit } from '@angular/core';
import { IdleTimerService } from './idle-timer.service';

@Component({
	selector: 'app-idle-timer',
	standalone: true,
	imports: [],
	templateUrl: './idle-timer.component.html',
	styleUrl: './idle-timer.component.css'
})
export class IdleTimerComponent implements OnInit {

	constructor(public idleTimerService: IdleTimerService){}
	
	ngOnInit() {
		this.idleTimerService.stopTimers();
		this.idleTimerService.startTimers();
	}
	
}
