import { Component, Input } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { IstringMessageResponse } from '../../../../core/requests/IstringMessageResponse';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientLinksServiceService } from '../client-links-service.service';

@Component({
	selector: 'app-delete-user-client-modal',
	standalone: true,
	imports: [NgbAlertModule, FontAwesomeModule],
	templateUrl: './delete-user-client-modal.component.html',
	styleUrl: './delete-user-client-modal.component.css'
})
export class DeleteUserClientModalComponent {
	@Input() client_link_id = '';
	@Input() client_name = '';
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	alertMessage = '';

	constructor(public activeModal: NgbActiveModal, private clientLinkService: ClientLinksServiceService) {
	}

	confirmDelete(){
		this.clientLinkService.deleteClientLink(this.client_link_id).subscribe({
			next: (data: IstringMessageResponse) => {
				this.activeModal.close('');
			},
			error: (error: string) => {
				this.alertMessage = error;
			},
			complete: () => {
			}
		});
	}

	closeAlert(): void{
		this.alertMessage = '';
	}
}
