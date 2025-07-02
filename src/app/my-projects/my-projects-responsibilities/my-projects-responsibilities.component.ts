import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../core/alerts/alerts.service';
import { faCircleMinus, faEdit, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { IgetResponsibilitiesResponse } from '../../mentor-projects/update-mentor-project/requests/IgetResponsibilitiesResponse';
import { MyProjectsResponsibilitiesService } from './my-projects-responsibilities.service';

@Component({
	selector: 'app-my-projects-responsibilities',
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
	templateUrl: './my-projects-responsibilities.component.html',
	styleUrl: './my-projects-responsibilities.component.css'
})
export class MyProjectsResponsibilitiesComponent implements OnInit {
	@Input() projectResponsibilities: IgetResponsibilitiesResponse[] = [];
	@Input() mentorProjectId!: string;
	visibleConfirm = false;
	delete_id = '';
	projectForm!: FormGroup;
	faCircleMinus = faCircleMinus;
	faEdit = faEdit;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	editingResponsibility: IgetResponsibilitiesResponse | null = null;	
	constructor(private projectService: MyProjectsResponsibilitiesService, private alertsService: AlertsService){ 
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
		this.projectService.createMyProjectResponsibilities(this.mentorProjectId, this.projectForm.value.new_responsibility).subscribe({
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
		this.projectService.deleteMyProjectResponsibilities(id).subscribe({
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

		this.projectService.updateMyProjectResponsibilities(id, newValue).subscribe({
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
