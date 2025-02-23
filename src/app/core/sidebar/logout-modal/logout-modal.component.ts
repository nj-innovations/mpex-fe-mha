import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-logout-modal',
    imports: [],
    templateUrl: './logout-modal.component.html',
    styleUrl: './logout-modal.component.css'
})
export class LogoutModalComponent {
	
	constructor(public activeModal: NgbActiveModal, private router: Router) {
	}

	clickYes(): void {
		this.activeModal.dismiss('');
		this.router.navigate(
			['/'], 
			{queryParams: { msg: 3 }}
		);
	}
}
