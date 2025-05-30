import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MentorProjectDropdowns, MentorProjectsService } from '../mentor-projects.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { IcreateMentorProjectResponse } from '../create-mentor-project-modal/request/IcreateMentorProjectResponse';

@Component({
	selector: 'app-create-mentor-project',
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	templateUrl: './create-mentor-project.component.html',
	styleUrl: './create-mentor-project.component.css'
})
export class CreateMentorProjectComponent implements OnInit {
	projectForm!: FormGroup;
	alertMessage = '';
	user_id = 0;
	dropdowns: MentorProjectDropdowns[] = [];
	paymentRS: string[] = [];
	formatLocationRS: string[] = [];

	constructor(public projectService: MentorProjectsService, private route: ActivatedRoute,
		private router: Router, private alertsService: AlertsService) {
			this.user_id = Number(this.route.snapshot.paramMap.get('user_id'));
	}
	
	ngOnInit() {
		this.projectForm = new FormGroup({
			'project_title': new FormControl(null, Validators.required),
			'project_description': new FormControl(null, Validators.required),
			'payment': new FormControl(null, Validators.required),
			'format_location': new FormControl(null, Validators.required)
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

	saveProject(): void {
		const postVars = {
			'user_id': this.user_id, 'project_title': this.projectForm.value.project_title,
			'project_description': this.projectForm.value.project_description,
			'payment': this.projectForm.value.payment,
			'format_location': this.projectForm.value.format_location
		};

		this.projectService.createMentorProject(postVars).subscribe({
			next: (data: IcreateMentorProjectResponse) => {
				this.router.navigate(
					['/mentor_projects/update', data.id],
					{ queryParams: { msg: 1 } }
				);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}
}
