import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../core/alerts/alerts.service';
import { ViewMentorProjectService } from '../view-mentor-project/view-mentor-project.service';
import { IviewMentorProjectResponse } from '../view-mentor-project/requests/IviewMentorProjectResponse';
import { finalize, forkJoin } from 'rxjs';
import { HomeService } from '../home/home.service';
import { IgetMentorsResponse } from '../home/requests/IgetMentorsResponse';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { RequestConnectionService } from './request-connection.service';
import { IstudentConnectionResponse } from './requests/IstudentConnectionResponse';

@Component({
	selector: 'app-request-connection',
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule],
	templateUrl: './request-connection.component.html',
	styleUrl: './request-connection.component.css'
})
export class RequestConnectionComponent implements OnInit {
	mentorId?: string;
	projectId?: string;
	projects: IviewMentorProjectResponse[] = [];
	mentors: IgetMentorsResponse[] = [];
	projectForm!: FormGroup;
	mentor?: IgetMentorsResponse;
	faFolderOpen = faFolderOpen;
	pageMode = '';
	project_title = '';
	project_id = '';

	constructor(private alertsService: AlertsService, private router: Router,
		private route: ActivatedRoute, public projectService: ViewMentorProjectService,
		private homeService: HomeService, public connectionService: RequestConnectionService
	) {}

	ngOnInit() {
        this.mentorId = this.route.snapshot.queryParamMap.get('mentor') ?? undefined;
        this.projectId = this.route.snapshot.queryParamMap.get('project') ?? undefined;
    	if (!this.mentorId && !this.projectId) {
        	this.alertsService.addErrorAlert('A mentor or project parameter must be provided in the URL.');
        	return;
    	}
		if(this.projectId == undefined){
			this.pageMode = 'B';
		} else {
			this.pageMode = 'A';
		}
		this.projectForm = new FormGroup({
			'student_comments': new FormControl(null),
			'selectedProject': new FormControl(null)
		});

		forkJoin({
			mentors: this.homeService.getMentors(),
			projects: this.projectService.getAllMentorProjects()
		}).subscribe({
			next: ({ mentors, projects }) => {
				if (this.mentorId) {
					this.mentor = mentors.find(m => m.guid === this.mentorId);
					if (!this.mentor) {
						this.alertsService.addErrorAlert('Mentor not found.');
						return;
					}
				}
				if (this.projectId) {
					const project = projects.find(p => p.id === this.projectId);
					this.mentorId = project?.mentor_guid;
					this.mentor = mentors.find(m => m.guid === this.mentorId);
					if (!project) {
						this.alertsService.addErrorAlert('Project not found.');
						return;
					}
					this.projectForm.patchValue({
						'selectedProject': project.id
					})
				}
				this.projects = projects.filter(p => p.mentor_guid === this.mentorId)

			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});
	}

	submitForm(): void {
		if (this.mentorId){
			const postVars = {
				'mentor_guid': this.mentorId,
				'student_comments': this.projectForm.value.student_comments ?? '',
				'project_title': this.project_title ?? '',
				'project_id': this.project_id ?? ''
			}
			this.connectionService.submitStudentConnection(postVars).subscribe({
				next: (response: IstudentConnectionResponse) => {
					this.alertsService.addSuccessAlert('Connection request submitted successfully.');
				},
				error: (error: string) => {
					this.alertsService.addErrorAlert(error);
				}
			});
		} else {
			this.alertsService.addErrorAlert('Invalid preceptor ID.');
		}
	}

	updateProjectTitle(project_title: string, project_id: string): void {
		this.project_title = project_title;
		this.project_id = project_id;
	}
}
