import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MentorProjectDropdowns } from '../../mentor-projects/mentor-projects.service';
import { IgetRequirementsResponse } from '../../mentor-projects/update-mentor-project/requests/IgetRequirementsResponse';
import { IgetResponsibilitiesResponse } from '../../mentor-projects/update-mentor-project/requests/IgetResponsibilitiesResponse';
import { AlertsService } from '../../core/alerts/alerts.service';
import { MyProjectsService } from '../my-projects.service';
import { forkJoin, finalize } from 'rxjs';
import { IgetMyProjectsResponse } from '../requests/IgetMyProjectsResponse';
import { MyProjectsRequirementsComponent } from '../my-projects-requirements/my-projects-requirements.component';
import { MyProjectsResponsibilitiesComponent } from '../my-projects-responsibilities/my-projects-responsibilities.component';

@Component({
	selector: 'app-my-projects-update',
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule, MyProjectsRequirementsComponent,
		MyProjectsResponsibilitiesComponent
	],
	templateUrl: './my-projects-update.component.html',
	styleUrl: './my-projects-update.component.css'
})
export class MyProjectsUpdateComponent implements OnInit {
	projectForm!: FormGroup;
	alertMessage = '';
	id = '';
	user_id = 0;
	dropdowns: MentorProjectDropdowns[] = [];
	paymentRS: string[] = [];
	formatLocationRS: string[] = [];
	isPageLoading = true;
	myProject!: IgetMyProjectsResponse;
	projectRequirements: IgetRequirementsResponse[] = [];
	projectResponsibilities: IgetResponsibilitiesResponse[] = [];
	faSpinner = faSpinner;

	constructor(public projectService: MyProjectsService, private route: ActivatedRoute,
		private router: Router, private alertsService: AlertsService) {
			this.id = this.route.snapshot.paramMap.get('id')?.toString() || '';
	}

	ngOnInit() {
		this.projectForm = new FormGroup({
			'project_title': new FormControl(null, Validators.required),
			'project_description': new FormControl(null, Validators.required),
			'payment': new FormControl(null, Validators.required),
			'format_location': new FormControl(null, Validators.required)
		});
		this.isPageLoading = false;

		forkJoin({
			getResponsibilities: this.projectService.getResponsibilities(this.id),
			getRequirements: this.projectService.getRequirements(this.id),
			getDropdowns: this.projectService.getMentorProjectDropdowns(),
			getMentorProject: this.projectService.getSingleProject(this.id)
		}).pipe(
			finalize(() => this.isPageLoading = false)
		).subscribe({
			next: (response) => {
				this.myProject = response.getMentorProject;
				//this.user_id = this.myProject.
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
					project_title: this.myProject.project_title,
					project_description: this.myProject.project_description,
					payment: this.myProject.payment,
					format_location: this.myProject.format_location
				});
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	};

	saveProject(): void {
		const putVars = {
			'project_title': this.projectForm.value.project_title,
			'project_description': this.projectForm.value.project_description,
			'payment': this.projectForm.value.payment,
			'format_location': this.projectForm.value.format_location
		};

		/* this.projectService.updateMentorProject(this.id, putVars).subscribe({
			next: (data: IupdateMentorProjectResponse) => {
				this.router.navigate(
					['/users/update', this.user_id],
					{ queryParams: { msg: 2 } }
				);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		}); */
	}
}
