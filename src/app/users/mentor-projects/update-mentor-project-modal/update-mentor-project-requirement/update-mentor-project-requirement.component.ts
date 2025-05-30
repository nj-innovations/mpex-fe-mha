import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IgetMentorProjectRequirementsRequest } from '../../requests/IgetMentorProjectRequirementsRequest';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faFileXmark, faFilePen } from '@fortawesome/pro-regular-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MentorProjectsService } from '../../mentor-projects.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IMentorProjectRequirements } from '../../requests/ImentorProjectRequirements';
import { IstringMessageResponse } from '../../../../core/requests/IstringMessageResponse';

@Component({
    selector: 'app-update-mentor-project-requirement',
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
    templateUrl: './update-mentor-project-requirement.component.html',
    styleUrl: './update-mentor-project-requirement.component.css'
})
export class UpdateMentorProjectRequirementComponent implements OnInit  {
	@Input() requirement?: IgetMentorProjectRequirementsRequest;
	@Output() messageEvent = new EventEmitter<any>();
	mentorProjectRequirementForm!: FormGroup;
	faFileXmark = faFileXmark;
	faFilePen = faFilePen;
	activeUpdate = false;
	static_requirement_text = '';
	alertMessage = '';
	confirmDelete = false;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;

	constructor(public projectService: MentorProjectsService) {
	}
	
	ngOnInit() {
		this.mentorProjectRequirementForm = new FormGroup({
			'requirement_text': new FormControl(this.requirement?.requirement, Validators.required)
		});
		if(this.requirement != undefined){
			this.static_requirement_text = this.requirement.requirement
		}
	}
	
	deleteRequirement(): void {
		this.confirmDelete = true;
	}
	
	confirmDeleteRequirement(): void {
		if(this.requirement != undefined){
			this.alertMessage = '';
			this.projectService.deleteMentorProjectRequirements(this.requirement.id).subscribe({
				next: (data: IstringMessageResponse) => {
					this.messageEvent.emit({'mode': 'delete', 'id': this.requirement?.id, 'requirement': this.mentorProjectRequirementForm.value.requirement_text});
				},
				error: (error: string) => {
					this.alertMessage = 'Unable to delete Requirement';
				},
				complete: () => {}
			});
		}
	}
	
	cancelDeleteRequirement(): void {
		this.confirmDelete = false;
	}

	updateRequirement(): void {
		this.activeUpdate = !this.activeUpdate;
	}

	saveRequirement(): void {
		if(this.requirement != undefined){
			this.alertMessage = '';
			this.projectService.updateMentorProjectRequirements(this.requirement.id, this.mentorProjectRequirementForm.value.requirement_text).subscribe({
				next: (data: IMentorProjectRequirements) => {
					this.static_requirement_text = this.mentorProjectRequirementForm.value.requirement_text;
					this.activeUpdate = !this.activeUpdate;
					this.messageEvent.emit({'mode': 'update', 'id': this.requirement?.id, 'requirement': this.mentorProjectRequirementForm.value.requirement_text});
				},
				error: (error: string) => {
					this.alertMessage = 'Unable to save Requirement';
				},
				complete: () => {}
			});
		}
	}
	
	cancelUpdate(): void {
		console.log('here');
	}

	closeAlert(): void {
		this.alertMessage = '';
	}
}
