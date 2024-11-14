import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { environment } from '../../../environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdleTimerModalComponent } from './idle-timer-modal/idle-timer-modal.component';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class IdleTimerService {
	private timeoutId: any;
	private countdownId: any;
	private countdownValue = 0;
	idleTimerModelRef?: NgbModalRef;
	public idleTime: number = environment.idleTime;	
	public activeTimer = false;

	idleTimeoutCountdown: Subject<number> = new Subject();
	
	constructor(public storageService: LocalStorageService,  private modalService: NgbModal, private router: Router) { 
	}

	startTimers(): void{
		this.activeTimer = true;
		window.addEventListener('mousemove', () => this.reset());
		window.addEventListener('click', () => this.reset());
		window.addEventListener('keypress', () => this.reset());
		window.addEventListener('DOMMouseScroll', () => this.reset());
		window.addEventListener('mousewheel', () => this.reset());
		window.addEventListener('touchmove', () => this.reset());
		window.addEventListener('MSPointerMove', () => this.reset());
		this.startIdleTimer();
	}

	reset(): void {
		if(this.activeTimer){
			this.clearAllTimers();
			this.startIdleTimer();
		}
	}

	startIdleTimer(): void {
		this.timeoutId = setTimeout(() => {
			this.idleTimerModelRef = this.modalService.open(IdleTimerModalComponent, {
				ariaLabelledBy: 'Idle Timeout',
				size: 'md'
			});
			this.idleTimerModelRef.result.then(
				(data: boolean) => {
					if(!data){
						this.logout();
					}
				},
				(error: Error) => {}
			);
			this.startCountdown();
		}, this.idleTime);
	}
	
	startCountdown(): void {
		this.stopIdleTimer();
		this.countdownValue = environment.idleCountDownTimer / 1000;
		this.countdownId = setInterval(() => {
			this.countdownValue--;
			this.idleTimeoutCountdown.next(this.countdownValue);
			if (this.countdownValue <= 0) {
				this.logout();
			}
		}, 1000);
	}

	stopTimers(): void {
		this.clearAllTimers();
		this.activeTimer = false;
	}

	stopIdleTimer(): void {
		this.activeTimer = false;
		clearTimeout(this.timeoutId);
	}

	clearAllTimers(){
		clearTimeout(this.timeoutId);
		clearInterval(this.countdownId);
	}

	logout(): void {
		this.router.navigate(
			['/'], 
			{queryParams: { msg: 3 }}
		);		
	}
}
