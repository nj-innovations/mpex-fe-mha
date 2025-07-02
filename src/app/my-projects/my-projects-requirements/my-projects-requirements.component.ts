import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleMinus, faThumbsUp, faThumbsDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IgetRequirementsResponse } from '../../mentor-projects/update-mentor-project/requests/IgetRequirementsResponse';
import { AlertsService } from '../../core/alerts/alerts.service';
import { MyProjectsRequirementsService } from './my-projects-requirements.service';

@Component({
	selector: 'app-my-projects-requirements',
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
	templateUrl: './my-projects-requirements.component.html',
	styleUrl: './my-projects-requirements.component.css'
})
export class MyProjectsRequirementsComponent implements OnInit {
	@Input() projectRequirements: IgetRequirementsResponse[] = [];
	@Input() mentorProjectId!: string;
	visibleConfirm = false;
	delete_id = '';
	projectForm!: FormGroup;
	faCircleMinus = faCircleMinus;
	faEdit = faEdit;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	editingRequirement: IgetRequirementsResponse | null = null;
	
	constructor(private projectService: MyProjectsRequirementsService, private alertsService: AlertsService){ 
	}
	
	ngOnInit() {
		this.projectForm = new FormGroup({
			'new_requirement': new FormControl(null, Validators.required),
			'edit_requirement': new FormControl(null, Validators.required)
		});
	}

	deleteRequirement(id: string): void {
		this.delete_id = id;
		this.visibleConfirm = true;
	}
	
	addRequirement(): void {
		this.projectService.createMyProjectRequirements(this.mentorProjectId, this.projectForm.value.new_requirement).subscribe({
			next: (data: IgetRequirementsResponse) => {
				this.projectRequirements.push(data);
				this.projectForm.get('new_requirement')?.reset();
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	confirmDelete(): void {
		const id = this.delete_id;
		this.projectService.deleteMyProjectRequirements(id).subscribe({
			next: () => {
				this.projectRequirements = this.projectRequirements.filter(req => req.id !== id);
				this.visibleConfirm = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	startEditRequirement(req: IgetRequirementsResponse) {
		this.editingRequirement = req;
		this.projectForm.get('edit_requirement')?.setValue(req.requirement);
	}

	saveEditRequirement() {
		if (!this.editingRequirement) return;
		const id = this.editingRequirement.id;
		const newValue = this.projectForm.get('edit_requirement')?.value;

		this.projectService.updateMyProjectRequirements(id, newValue).subscribe({
			next: (updated: IgetRequirementsResponse) => {
				const idx = this.projectRequirements.findIndex(r => r.id === id);
				if (idx > -1) this.projectRequirements[idx].requirement = updated.requirement;
				this.editingRequirement = null;
				this.projectForm.get('edit_requirement')?.reset();
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	cancelEditRequirement() {
		this.editingRequirement = null;
		this.projectForm.get('edit_requirement')?.reset();
	}
}
