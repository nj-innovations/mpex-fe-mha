import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AlertsService } from '../core/alerts/alerts.service';
import { ViewMentorProjectService } from './view-mentor-project.service';
import { IviewMentorProjectResponse } from './requests/IviewMentorProjectResponse';
import { finalize, forkJoin } from 'rxjs';
import { IgetRequirementsResponse } from '../mentor-projects/update-mentor-project/requests/IgetRequirementsResponse';
import { IgetResponsibilitiesResponse } from '../mentor-projects/update-mentor-project/requests/IgetResponsibilitiesResponse';

@Component({
	selector: 'app-view-mentor-project',
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule],
	templateUrl: './view-mentor-project.component.html',
	styleUrl: './view-mentor-project.component.css'
})
export class ViewMentorProjectComponent implements OnInit {
	projectForm!: FormGroup;
	alertMessage = '';
	id = '';
	user_id = 0;
	isPageLoading = true;
	faSpinner = faSpinner;
	mentorProject!: IviewMentorProjectResponse;
	projectRequirements: IgetRequirementsResponse[] = [];
	projectResponsibilities: IgetResponsibilitiesResponse[] = [];

	constructor(private alertsService: AlertsService, private router: Router,
		public projectService: ViewMentorProjectService) {}
	

	ngOnInit() {
		this.alertsService.clearAlerts();
		const guid = this.router.url.split('/').pop();
		if(guid){
			forkJoin({
				getResponsibilities: this.projectService.getResponsibilities(guid),
				getRequirements: this.projectService.getRequirements(guid),
				getMentorProject: this.projectService.getMentorProject(guid)
			}).pipe(
				finalize(() => this.isPageLoading = false)
			).subscribe({
				next: (response) => {
					this.mentorProject = response.getMentorProject;
					this.projectResponsibilities = response.getResponsibilities;
					this.projectRequirements = response.getRequirements;
					if (!this.mentorProject) {
						this.alertsService.addErrorAlert('Mentor Project not found');
						this.router.navigate(['/mentors']);
					}
				},
				error: (error: string) => {
					this.alertsService.addErrorAlert(error);
				}
			});
		} else {
			this.alertsService.addErrorAlert('Invalid Mentor Project ID');
			this.router.navigate(['/mentors']);
		}
	}
}
