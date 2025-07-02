import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleMinus, faThumbsDown, faThumbsUp, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IgetRequirementsResponse } from '../update-mentor-project/requests/IgetRequirementsResponse';
import { UpdateMentorProjectService } from '../update-mentor-project/update-mentor-project.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../core/alerts/alerts.service';

@Component({
	selector: 'app-mentor-projects-requirements',
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
	templateUrl: './mentor-projects-requirements.component.html',
	styleUrl: './mentor-projects-requirements.component.css'
})
export class MentorProjectsRequirementsComponent implements OnInit {
	@Input() projectRequirements: IgetRequirementsResponse[] = [];
	@Input() mentorProjectId!: string;
	visibleConfirm = false;
	delete_id = '';
	projectForm!: FormGroup;
	faCircleMinus = faCircleMinus;
	faThumbsUp = faThumbsUp;
	faEdit = faEdit;
	faThumbsDown = faThumbsDown;
	editingRequirement: IgetRequirementsResponse | null = null;
		
	constructor(private projectService: UpdateMentorProjectService, private alertsService: AlertsService){ 
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
		this.projectService.saveRequirement(this.mentorProjectId, this.projectForm.value.new_requirement).subscribe({
			next: (data: IgetRequirementsResponse) => {
				this.projectRequirements.push(data);
				this.projectForm.get('add_requirement')?.reset();
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	confirmDelete(): void {
		const id = this.delete_id;
		this.projectService.deleteRequirement(id).subscribe({
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
		console.log(req);
		this.projectForm.get('edit_requirement')?.setValue(req.requirement);
	}

	saveEditRequirement() {
		if (!this.editingRequirement) return;
		const id = this.editingRequirement.id;
		const newValue = this.projectForm.get('edit_requirement')?.value;

		this.projectService.updateRequirement(id, newValue).subscribe({
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
