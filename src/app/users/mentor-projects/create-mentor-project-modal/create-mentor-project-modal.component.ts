import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IcreateMentorProjectResponse } from './request/IcreateMentorProjectResponse';
import { MentorProjectsService } from '../mentor-projects.service';


@Component({
    selector: 'app-create-mentor-project-modal',
    imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
    templateUrl: './create-mentor-project-modal.component.html',
    styleUrl: './create-mentor-project-modal.component.css'
})
export class CreateMentorProjectModalComponent implements OnInit {
	projectForm!: FormGroup;
	alertMessage = '';
	user_id = 0;

	constructor(public activeModal: NgbActiveModal, public projectService: MentorProjectsService) {
	}
	
	ngOnInit() {
		this.projectForm = new FormGroup({
			'project': new FormControl(null, Validators.required),
		});
	}

	Save(): void {
		const postVars = {'user_id': this.user_id, 'project': this.projectForm.value.project}
		this.projectService.createMentorProject(postVars).subscribe({
			next: (data: IcreateMentorProjectResponse) => {
				this.activeModal.close(data);				
			},
			error: (error: string) => {
				this.alertMessage = 'Unable to save Mentor Project';
			},
			complete: () => {}
		});
	}

	closeAlert(): void {
		this.alertMessage = '';
	}	
}
