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
import { finalize, forkJoin } from 'rxjs';
import { IviewMentorProjectResponse } from '../view-mentor-project/requests/IviewMentorProjectResponse';
import { IstudentConnectionResponse } from './requests/IstudentConnectionResponse';

@Component({
	selector: 'app-view-mentor',
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule, NgbAlertModule],
	templateUrl: './view-mentor.component.html',
	styleUrl: './view-mentor.component.css'
})
export class ViewMentorComponent implements OnInit {
	projectForm!: FormGroup;
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

		this.projectForm = new FormGroup({
			'student_comments': new FormControl(null),
			'person_name_search': new FormControl(null)
		});
	}

	toggleMeetPerson(): void {
		this.visibleStudentComment = !this.visibleStudentComment;
	}

	cancelMeetPerson(): void {
		this.visibleStudentComment = false;
	}

	submitForm(): void {
		this.closeErrorAlert();
		this.closeSuccessAlert();
		const postVars = {'mentor_guid': this.mentor_guid, 'student_comments': this.projectForm.value.student_comments ?? ''}
		this.mentorService.submitStudentConnection(postVars).pipe(
			finalize(() => {
				this.visibleErrorAlert = true;
			})
		).
		subscribe({
			next: (response: IstudentConnectionResponse) => {
				this.cancelMeetPerson();
			},
			error: (error: string) => {
				this.errorMessage = error.toString().replace('Error: ', '');
			}
		});
	}

	closeSuccessAlert(): void {
		this.visibleSuccessAlert = false;
	}

	closeErrorAlert(): void {
		this.visibleErrorAlert = false;
	}
}
