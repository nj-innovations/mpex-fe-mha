import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../core/alerts/alerts.service';
import { ViewMentorService } from './view-mentor.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IviewMentorResponse } from './requests/IviewMentorResponse';
import { ViewMentorProjectService } from '../view-mentor-project/view-mentor-project.service';
import { forkJoin } from 'rxjs';
import { IviewMentorProjectResponse } from '../view-mentor-project/requests/IviewMentorProjectResponse';

@Component({
	selector: 'app-view-mentor',
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
	templateUrl: './view-mentor.component.html',
	styleUrl: './view-mentor.component.css'
})
export class ViewMentorComponent implements OnInit {
	alertMessage = '';
	id = '';
	user_id = 0;
	isPageLoading = true;
	faSpinner = faSpinner;
	mentor!: IviewMentorResponse;
	projects: IviewMentorProjectResponse[] = [];
	visibleStudentComment = false;
	visibleSuccessAlert = false;
	visibleErrorAlert = false;
	errorMessage = '';
	mentor_guid = '';

	constructor(public mentorService: ViewMentorService, private alertsService: AlertsService,
		private router: Router, public projectService: ViewMentorProjectService) {}
	
	ngOnInit() {
		this.alertsService.clearAlerts();
		const guid = this.router.url.split('/').pop()
		if (guid) {
			this.mentor_guid = guid;
			forkJoin({
				mentor: this.mentorService.getMentor(guid),
				projects: this.projectService.getMentorProjectsByGuid(guid)
			}).subscribe({
				next: ({ mentor, projects }) => {
					this.mentor = mentor;
					this.projects = projects;
					this.isPageLoading = false;
				},
				error: (error) => {
					this.isPageLoading = false;
					this.alertsService.addErrorAlert(error);
				}
			});
		} else {
			this.alertsService.addErrorAlert('Invalid Mentor ID');
			this.router.navigate(['/mentors']);
		}

	}

	toggleMeetPerson(): void {
		this.router.navigate(['/request-connection'], { queryParams: { mentor: this.mentor_guid } });		
	}
}
