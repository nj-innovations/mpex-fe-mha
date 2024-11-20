import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IgetMentorProjectRequirementsRequest } from '../../requests/IgetMentorProjectRequirementsRequest';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faFileXmark, faFilePen } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-update-mentor-project-requirement',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
	templateUrl: './update-mentor-project-requirement.component.html',
	styleUrl: './update-mentor-project-requirement.component.css'
})
export class UpdateMentorProjectRequirementComponent {
	@Input() requirement?: IgetMentorProjectRequirementsRequest;
	@Output() messageEvent = new EventEmitter<any>();
	mentorProjectRequirementForm!: FormGroup;
	faFileXmark = faFileXmark;
	faFilePen = faFilePen;
	activeUpdate = false;

	constructor() {
	}
	
	ngOnInit() {
		this.mentorProjectRequirementForm = new FormGroup({
			'requirement_text': new FormControl(this.requirement?.requirement, Validators.required),
			'static_requirement_text': new FormControl(this.requirement?.requirement, null)
		});
	}
	
	deleteRequirement(): void {
		this.messageEvent.emit({'mode': 'delete', 'id': this.requirement?.id});
	}
	
	updateRequirement(): void {
		this.activeUpdate = !this.activeUpdate;
	}

	saveRequirement(): void {
		this.messageEvent.emit({'mode': 'update', 'id': this.requirement?.id, 'requirement': this.mentorProjectRequirementForm.value.requirement_text});
	}
	
	cancelUpdate(): void {
		console.log('here');
	}
}
