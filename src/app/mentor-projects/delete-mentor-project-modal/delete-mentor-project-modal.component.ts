import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MentorProjectsService } from '../mentor-projects.service';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
//import { ImentorProjectRequest } from '../../users/requests/IuserRequest';


@Component({
    selector: 'app-delete-mentor-project-modal',
    imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
    templateUrl: './delete-mentor-project-modal.component.html',
    styleUrl: './delete-mentor-project-modal.component.css'
})
export class DeleteMentorProjectModalComponent {
	@Input() project?: any;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	alertMessage = '';

	constructor(public activeModal: NgbActiveModal, private projectService: MentorProjectsService) {
	}

	confirmDelete(){
		if(this.project !== undefined){
			this.projectService.deleteMentorProject(this.project.id).subscribe({
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
