import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faFileXmark, faFilePen } from '@fortawesome/pro-regular-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IstringMessageResponse } from '../../../core/requests/IstringMessageResponse';
import { MyProjectsService } from '../../my-projects.service';
import { IgetMyProjectsRequirements } from '../../requests/IgetMyProjectsResponse';
import { IMentorProjectRequirements } from '../../../users/mentor-projects/requests/IMentorProjectRequirements';


@Component({
	selector: 'app-update-my-projects-requirement',
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
	templateUrl: './update-my-projects-requirement.component.html',
	styleUrl: './update-my-projects-requirement.component.css'
})
export class UpdateMyProjectsRequirementComponent implements OnInit {
	@Input() requirement?: IgetMyProjectsRequirements;
	@Output() messageEvent = new EventEmitter<any>();
	myProjectRequirementForm!: FormGroup;
	faFileXmark = faFileXmark;
	faFilePen = faFilePen;
	activeUpdate = false;
	static_requirement_text = '';
	alertMessage = '';
	confirmDelete = false;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;

	constructor(public projectService: MyProjectsService) {
	}

	ngOnInit() {
		this.myProjectRequirementForm = new FormGroup({
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
			this.projectService.deleteMyProjectRequirements(this.requirement.requirement_id).subscribe({
				next: (data: IstringMessageResponse) => {
					this.messageEvent.emit({'mode': 'delete', 'id': this.requirement?.requirement_id, 'requirement': this.myProjectRequirementForm.value.requirement_text});
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
			this.projectService.updateMyProjectRequirements(this.requirement.requirement_id, this.myProjectRequirementForm.value.requirement_text).subscribe({
				next: (data: IMentorProjectRequirements) => {
					this.static_requirement_text = this.myProjectRequirementForm.value.requirement_text;
					this.activeUpdate = !this.activeUpdate;
					this.messageEvent.emit({'mode': 'update', 'id': this.requirement?.requirement_id, 'requirement': this.myProjectRequirementForm.value.requirement_text});
				},
				error: (error: string) => {
					this.alertMessage = 'Unable to save Requirement';
				}
			});
		}
	}
	
	cancelUpdate(): void {
		this.activeUpdate = !this.activeUpdate;
	}

	closeAlert(): void {
		this.alertMessage = '';
	}
}
