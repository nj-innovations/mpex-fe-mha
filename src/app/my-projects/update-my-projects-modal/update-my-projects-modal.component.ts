import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { faCirclePlus, faCircleMinus, faFileXmark, faFilePen, faFileCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IgetMyProjectsResponse, IgetMyProjectsRequirements } from '../requests/IgetMyProjectsResponse';
import { UpdateMyProjectsRequirementComponent } from './update-my-projects-requirement/update-my-projects-requirement.component';
import { MyProjectsService } from '../my-projects.service';
import { IMentorProjectRequirements } from '../../users/mentor-projects/requests/IMentorProjectRequirements';

@Component({
	selector: 'app-update-my-projects-modal',
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule, UpdateMyProjectsRequirementComponent],
	templateUrl: './update-my-projects-modal.component.html',
	styleUrl: './update-my-projects-modal.component.css'
})
export class UpdateMyProjectsModalComponent {
	project!: IgetMyProjectsResponse;
	projectForm!: FormGroup;
	requirements: IgetMyProjectsRequirements[] = [];
	alertMessage = '';
	user_id = 0;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	visibleNewRequirement = false;

	constructor(public activeModal: NgbActiveModal, public projectService: MyProjectsService) {
	}
	
	ngOnInit() {
		this.projectForm = new FormGroup({
			'project': new FormControl(this.project?.project, Validators.required),
			'new_requirement': new FormControl(null, null),
		});
	}

	Save(): void {
		/* if(this.project !== undefined){
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
		} */
	}

	createRequirement(): void {
		this.visibleNewRequirement = !this.visibleNewRequirement;
	}

	saveRequirement(): void {
		this.alertMessage = '';
		if(this.project != undefined){
			this.projectService.createMyProjectRequirements(this.project.id, this.projectForm.value.new_requirement).subscribe({
				next: (data: IMentorProjectRequirements) => {
					this.project.requirements.push({'requirement_id': data.id,'requirement': data.requirement})
				},
				error: (error: string) => {
					this.alertMessage = 'Unable to save Requirement';
				}
			});
		}
	}

	closeAlert(): void {
		this.alertMessage = '';
	}

	receiveMessage(event: any) {
		console.log(event);
		const i = this.project.requirements.findIndex((c) => c.requirement_id == event.id);
		if(event.mode == 'delete'){
			this.project.requirements.splice(i, 1);
		}
		if(event.mode == 'update'){
			this.project.requirements[i].requirement = event.requirement;
		}
	}
}
