import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MentorProjectDropdowns, MentorProjectsService } from '../mentor-projects.service';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { forkJoin, finalize } from 'rxjs';
import { UpdateMentorProjectService } from './update-mentor-project.service';
import { IgetMentorProjectResponse } from './requests/IgetMentorProjectResponse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MentorProjectsRequirementsComponent } from '../mentor-projects-requirements/mentor-projects-requirements.component';
import { IgetResponsibilitiesResponse } from './requests/IgetResponsibilitiesResponse';
import { IgetRequirementsResponse } from './requests/IgetRequirementsResponse';
import { MentorProjectsResponsibilitiesComponent } from '../mentor-projects-responsibilities/mentor-projects-responsibilities.component';

@Component({
	selector: 'app-update-mentor-project',
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule,
		MentorProjectsRequirementsComponent,MentorProjectsResponsibilitiesComponent
	],
	templateUrl: './update-mentor-project.component.html',
	styleUrl: './update-mentor-project.component.css'
})
export class UpdateMentorProjectComponent implements OnInit {
	projectForm!: FormGroup;
	alertMessage = '';
	id = '';
	user_id = 0;
	dropdowns: MentorProjectDropdowns[] = [];
	paymentRS: string[] = [];
	formatLocationRS: string[] = [];
	isPageLoading = true;
	mentorProject!: IgetMentorProjectResponse;
	projectRequirements: IgetRequirementsResponse[] = [];
	projectResponsibilities: IgetResponsibilitiesResponse[] = [];
	faSpinner = faSpinner;

	constructor(public projectService: MentorProjectsService, private route: ActivatedRoute,
		private router: Router, private alertsService: AlertsService,
		private updateService: UpdateMentorProjectService) {
			this.id = this.route.snapshot.paramMap.get('id')?.toString() || '';
	}

	ngOnInit() {
		this.projectForm = new FormGroup({
			'project_title': new FormControl(null, Validators.required),
			'project_description': new FormControl(null, Validators.required),
			'payment': new FormControl(null, Validators.required),
			'format_location': new FormControl(null, Validators.required)
		});

		forkJoin({
			getResponsibilities: this.updateService.getResponsibilities(this.id),
			getRequirements: this.updateService.getRequirements(this.id),
			getDropdowns: this.projectService.getMentorProjectDropdowns(),
			getMentorProject: this.projectService.getMentorProject(this.id)
		}).pipe(
			finalize(() => this.isPageLoading = false)
		).subscribe({
			next: (response) => {
				this.mentorProject = response.getMentorProject;
				this.user_id = this.mentorProject.user_id;
				this.projectResponsibilities = response.getResponsibilities;
				this.projectRequirements = response.getRequirements;
				response.getDropdowns.mentor_project_dropdowns.forEach(dropdown => {
					if (dropdown.id === 'payment') {
						this.paymentRS = dropdown.items;
					}
 					if (dropdown.id === 'format_location') {
						this.formatLocationRS = dropdown.items;
					}
				});

				this.projectForm.patchValue({
					project_title: this.mentorProject.project_title,
					project_description: this.mentorProject.project_description,
					payment: this.mentorProject.payment,
					format_location: this.mentorProject.format_location
				});
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	saveProject(){

	}
}
