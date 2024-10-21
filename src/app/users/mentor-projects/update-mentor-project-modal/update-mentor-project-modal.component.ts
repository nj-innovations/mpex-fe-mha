import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IupdateMentorProjectResponse } from './request/IupdateMentorProjectResponse';
import { MentorProjectsService } from '../mentor-projects.service';
import { ImentorProjectRequest } from '../../requests/IuserRequest';

@Component({
	selector: 'app-update-mentor-project-modal',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
	templateUrl: './update-mentor-project-modal.component.html',
	styleUrl: './update-mentor-project-modal.component.css'
})
export class UpdateMentorProjectModalComponent {
	@Input() project?: ImentorProjectRequest;
	projectForm!: FormGroup;
	alertMessage = '';
	user_id = 0;

	constructor(public activeModal: NgbActiveModal, public projectService: MentorProjectsService) {
	}
	
	ngOnInit() {
		this.projectForm = new FormGroup({
			'project': new FormControl(this.project?.project, Validators.required),
		});
	}

	Save(): void {
		if(this.project !== undefined){
			const putVars = {'project': this.projectForm.value.project}
			this.projectService.updateMentorProject(this.project.id, putVars).subscribe({
				next: (data: IupdateMentorProjectResponse) => {
					this.activeModal.close(data);				
				},
				error: (error: string) => {
					this.alertMessage = 'Unable to save Mentor Project';
				},
				complete: () => {}
			});
		}
	}

	closeAlert(): void {
		this.alertMessage = '';
	}
}
