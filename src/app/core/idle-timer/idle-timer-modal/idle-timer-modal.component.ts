import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IdleTimerService } from '../idle-timer.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-idle-timer-modal',
    imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
    templateUrl: './idle-timer-modal.component.html',
    styleUrl: './idle-timer-modal.component.css'
})
export class IdleTimerModalComponent implements OnInit {
	countDownTimer = environment.idleCountDownTimer / 1000;
	
	constructor(public activeModal: NgbActiveModal, private idleUserService: IdleTimerService) {
	}
	
	ngOnInit() {
		this.idleUserService.idleTimeoutCountdown.subscribe({
			next: (countDownTimer: number) => {
				if(countDownTimer < 1){
					this.activeModal.close(false);
				} else {
					this.countDownTimer = countDownTimer;
				}
				
			},
			error: (error: string) => {
			},
		});
	}
	
	dismiss(): void {
		this.activeModal.dismiss(true);
	}

	confirmYes(): void {
		this.idleUserService.startTimers();
		this.activeModal.close(true);
	}

	confirmNo(): void {
		this.activeModal.close(false);
	}
}
