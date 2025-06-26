import { Component, OnInit } from '@angular/core';
import { MyProjectsService } from '../my-projects.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MentorProjectDropdowns } from '../../mentor-projects/mentor-projects.service';
import { AlertsService } from '../../core/alerts/alerts.service';
import { IstoreMyProjectsResponse } from '../requests/IstoreMyProjectsResponse';

@Component({
	selector: 'app-my-projects-create',
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	templateUrl: './my-projects-create.component.html',
	styleUrl: './my-projects-create.component.css'
})
export class MyProjectsCreateComponent implements OnInit {
	projectForm!: FormGroup;
	alertMessage = '';
	user_id = 0;
	dropdowns: MentorProjectDropdowns[] = [];
	paymentRS: string[] = [];
	formatLocationRS: string[] = [];
	
	constructor(public projectService: MyProjectsService, private alertsService: AlertsService,
		private router: Router) {}
	
	ngOnInit() {
		this.projectForm = new FormGroup({
			'project_title': new FormControl(null, Validators.required),
			'project_description': new FormControl(null, Validators.required),
			'format_location': new FormControl(null, Validators.required),
			'payment': new FormControl(null, Validators.required),
		});
	
		this.projectService.getMentorProjectDropdowns().subscribe({
			next: (data: MentorProjectDropdowns) => {
				data.mentor_project_dropdowns.forEach(dropdown => {
					if (dropdown.id === 'payment') {
						this.paymentRS = dropdown.items;
					}
 					if (dropdown.id === 'format_location') {
						this.formatLocationRS = dropdown.items;
					}
				});
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {}
		});
	}
	
	Save(): void {
		const postVars = {
			'project_title': this.projectForm.value.project_title,
			'project_description': this.projectForm.value.project_description,
			'format_location': this.projectForm.value.format_location,
			'payment': this.projectForm.value.payment
		};

		this.projectService.createMyProject(postVars).subscribe({
			next: (data: IstoreMyProjectsResponse) => {
				this.router.navigate(
					['/projects/update', data.id],
					{ queryParams: { msg: 1 } }
				);
			},
			error: (error: string) => {
				this.alertMessage = 'Unable to save Mentor Project';
			},
			complete: () => {}
		});
	}
}
