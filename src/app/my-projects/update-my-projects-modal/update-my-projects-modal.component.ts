import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { faCirclePlus, faCircleMinus, faFileXmark, faFilePen, faFileCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IgetMyProjectsResponse } from '../requests/IgetMyProjectsResponse';
import { UpdateMyProjectsRequirementComponent } from './update-my-projects-requirement/update-my-projects-requirement.component';
import { MyProjectsService } from '../my-projects.service';
import { IstoreMyProjectsResponse } from '../requests/IstoreMyProjectsResponse';
import { ImentorProjectRequirements } from '../../mentor-projects/requests/ImentorProjectRequirements';

@Component({
	selector: 'app-update-my-projects-modal',
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
	templateUrl: './update-my-projects-modal.component.html',
	styleUrl: './update-my-projects-modal.component.css'
})
export class UpdateMyProjectsModalComponent {
	project!: IgetMyProjectsResponse;
	projectForm!: FormGroup;
	//requirements: IgetMyProjectsRequirements[] = [];
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
			'project_title': new FormControl(this.project?.project_title, Validators.required),
			'project_description': new FormControl(this.project?.project_description, Validators.required),
			'new_requirement': new FormControl(null, null),
		});
	}

	Save(): void {
		if(this.project !== undefined){
			const putVars = {'project_title': this.projectForm.value.project_title, 'project_description': this.projectForm.value.project_description};
			this.projectService.updateMyProject(this.project.id, putVars).subscribe({
				next: (data: IstoreMyProjectsResponse) => {
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
		/* this.alertMessage = '';
		if(this.project != undefined){
			this.projectService.createMyProjectRequirements(this.project.id, this.projectForm.value.new_requirement).subscribe({
				next: (data: ImentorProjectRequirements) => {
					this.project.requirements.push({'requirement_id': data.id,'requirement': data.requirement});
					this.visibleNewRequirement = false;
				},
				error: (error: string) => {
					this.alertMessage = 'Unable to save Requirement';
				}
			});
		} */
	}

	closeAlert(): void {
		this.alertMessage = '';
	}

	receiveMessage(event: any) {
		/* console.log(event);
		const i = this.project.requirements.findIndex((c) => c.requirement_id == event.id);
		if(event.mode == 'delete'){
			this.project.requirements.splice(i, 1);
		}
		if(event.mode == 'update'){
			this.project.requirements[i].requirement = event.requirement;
		} */
	}
}
