import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { faCirclePlus, faCircleMinus, faFileXmark, faFilePen, faFileCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IupdateMentorProjectResponse } from './request/IupdateMentorProjectResponse';
import { MentorProjectsService } from '../mentor-projects.service';
import { ImentorProjectRequest } from '../../requests/IuserRequest';
import { IgetMentorProjectRequirementsRequest } from '../requests/IgetMentorProjectRequirementsRequest';
import { UpdateMentorProjectRequirementComponent } from './update-mentor-project-requirement/update-mentor-project-requirement.component';
import { IMentorProjectRequirements } from '../requests/IMentorProjectRequirements';

@Component({
    selector: 'app-update-mentor-project-modal',
    imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule, UpdateMentorProjectRequirementComponent],
    templateUrl: './update-mentor-project-modal.component.html',
    styleUrl: './update-mentor-project-modal.component.css'
})
export class UpdateMentorProjectModalComponent {
	@Input() project?: ImentorProjectRequest;
	projectForm!: FormGroup;
	requirements: IgetMentorProjectRequirementsRequest[] = [];
	alertMessage = '';
	user_id = 0;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	visibleNewRequirement = false;

	constructor(public activeModal: NgbActiveModal, public projectService: MentorProjectsService) {
	}
	
	ngOnInit() {
		if(this.project?.id != null){
			this.projectService.getMentorProjectRequirements(this.project.id).subscribe({
				next: (data: IgetMentorProjectRequirementsRequest[]) => {
					this.requirements = data;
				},
				error: (error: string) => {
				},
				complete: () => {}
			});
		}
		this.projectForm = new FormGroup({
			'project': new FormControl(this.project?.project, Validators.required),
			'new_requirement': new FormControl(null, null),
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

	createRequirement(): void {
		this.visibleNewRequirement = !this.visibleNewRequirement;
	}

	saveRequirement(): void {
		this.alertMessage = '';
		if(this.project != undefined){
			this.projectService.createMentorProjectRequirements(this.project.id, this.projectForm.value.new_requirement).subscribe({
				next: (data: IMentorProjectRequirements) => {
					this.requirements.push({'id': data.id,'requirement': data.requirement})
				},
				error: (error: string) => {
					this.alertMessage = 'Unable to save Requirement';
				},
				complete: () => {}
			});
		}
	}

	closeAlert(): void {
		this.alertMessage = '';
	}

	receiveMessage(event: any) {
		if(event.mode == 'delete'){
			const i = this.requirements.findIndex((c) => c.id == event.id);
			this.requirements.splice(i, 1);
		}
	}
}
