import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubmitButtonService {
	isLoadingSubject = new Subject<any>();
	isLoading = false;
	activeButton : string[] = [];

	setFalse() {
		if (this.isLoading) {
			this.isLoading = false;
			this.updateLoading();
		}
	}

	setTrue() {
		if (!this.isLoading) {
			this.isLoading = true;
			this.updateLoading();
		}
	}

	updateLoading() {
		this.isLoadingSubject.next({ 'loading': this.isLoading });
	}

	addActiveButton(buttonID : string) {
		this.activeButton.push(buttonID);
	}

	removeActiveButton(buttonID : string) {
		const index = this.activeButton.indexOf(buttonID);
		this.activeButton.splice(index, 1);
	}

	isActiveButton(buttonID : string) {
		return this.activeButton.indexOf(buttonID);
	}
}