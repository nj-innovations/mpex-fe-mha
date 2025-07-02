import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleMinus, faThumbsDown, faThumbsUp, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UpdateMentorProjectService } from '../update-mentor-project/update-mentor-project.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IgetResponsibilitiesResponse } from '../update-mentor-project/requests/IgetResponsibilitiesResponse';
import { AlertsService } from '../../core/alerts/alerts.service';


@Component({
	selector: 'app-mentor-projects-responsibilities',
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
	templateUrl: './mentor-projects-responsibilities.component.html',
	styleUrl: './mentor-projects-responsibilities.component.css'
})
export class MentorProjectsResponsibilitiesComponent implements OnInit {
	@Input() projectResponsibilities: IgetResponsibilitiesResponse[] = [] 
	@Input() mentorProjectId!: string;
	visibleConfirm = false;
	delete_id = '';
	projectForm!: FormGroup;
	faCircleMinus = faCircleMinus;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	faEdit = faEdit;
	editingResponsibility: IgetResponsibilitiesResponse | null = null;

	constructor(private projectService: UpdateMentorProjectService, private alertsService: AlertsService) { 
	}

	ngOnInit() {
		this.projectForm = new FormGroup({
			'new_responsibility': new FormControl(null, Validators.required),
			'edit_responsibility': new FormControl(null, Validators.required)
		});
	}

	deleteResponsibility(id: string): void {
		this.delete_id = id;
		this.visibleConfirm = true;
	}
	
	addResponsibility(): void {
		this.projectService.saveResponsibility(this.mentorProjectId, this.projectForm.value.new_responsibility).subscribe({
			next: (data: IgetResponsibilitiesResponse) => {
				this.projectResponsibilities.push(data);
				this.projectForm.get('new_responsibility')?.reset();
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	confirmDelete(): void {
		const id = this.delete_id;
		this.projectService.deleteResponsibility(id).subscribe({
			next: () => {
				this.projectResponsibilities = this.projectResponsibilities.filter(req => req.id !== id);
				this.visibleConfirm = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	startEditResponsibility(req: IgetResponsibilitiesResponse) {
		this.editingResponsibility = req;
		this.projectForm.get('edit_responsibility')?.setValue(req.responsibility);
	}

	saveEditResponsibility() {
		if (!this.editingResponsibility) return;
		const id = this.editingResponsibility.id;
		const newValue = this.projectForm.get('edit_responsibility')?.value;

		this.projectService.updateResponsibility(id, newValue).subscribe({
			next: (updated: IgetResponsibilitiesResponse) => {
				const idx = this.projectResponsibilities.findIndex(r => r.id === id);
				if (idx > -1) this.projectResponsibilities[idx].responsibility = updated.responsibility;
				this.editingResponsibility = null;
				this.projectForm.get('edit_responsibility')?.reset();
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	cancelEditResponsibility() {
		this.editingResponsibility = null;
		this.projectForm.get('edit_responsibility')?.reset();
	}
}
