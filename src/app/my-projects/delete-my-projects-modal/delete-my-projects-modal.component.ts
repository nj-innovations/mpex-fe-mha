import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MyProjectsService } from '../my-projects.service';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { IgetMyProjectsResponse } from '../requests/IgetMyProjectsResponse';

@Component({
	selector: 'app-delete-my-projects-modal',
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
	templateUrl: './delete-my-projects-modal.component.html',
	styleUrl: './delete-my-projects-modal.component.css'
})
export class DeleteMyProjectsModalComponent {
	@Input() project?: IgetMyProjectsResponse;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	alertMessage = '';

	constructor(public activeModal: NgbActiveModal, private projectService: MyProjectsService) {
	}

	confirmDelete(){
		if(this.project !== undefined){
			this.projectService.deleteMyProject(this.project.id).subscribe({
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
	}

	closeAlert(): void{
		this.alertMessage = '';
	}
}
