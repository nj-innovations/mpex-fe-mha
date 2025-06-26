import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { AlertsService } from '../core/alerts/alerts.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../environments/environment';
import { NgbCollapseModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../core/helper.service';
import { LocalStorageService } from '../core/local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchMentorModalService } from './search-mentor-modal/search-mentor-modal.service';
import { Mentor } from '../models/Mentor';
import { IdropdownsResponse } from '../index/requests/IdropdownsResponse';
import { Router } from '@angular/router';
import { ViewMentorProjectService } from '../view-mentor-project/view-mentor-project.service';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-home',
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbCollapseModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	homeForm!: FormGroup;
	isPageLoading = true;
	faSpinner = faRotate;
	unknownPerson = environment.imagesUrl + '/Unknown_person.jpg';
	mentors: Mentor[] = [];
	profileModalRef?: NgbModalRef;
	searchMentorModelRef?: NgbModalRef;
	selectedPersonType = 'b';
	sectors?: IdropdownsResponse[] = [];
	visibleProfileCount = 1;
	mentorProjects: MentorProjectMenu[] = [];
	visiblePreceptorList = false;
	visibleProjectList = true;
	
	constructor(private homeService: HomeService, private alertsService: AlertsService,
		public sessionStorage: LocalStorageService,
		public helperService: HelperService,
		public searchService: SearchMentorModalService, private router: Router,
		public projectService: ViewMentorProjectService) {
	}

	ngOnInit() {
		forkJoin({
			mentors: this.homeService.getMentors(),
			projects: this.projectService.getAllMentorProjects()
		}).subscribe({
			next: ({ mentors, projects }) => {
				this.mentors = mentors.filter((r) => r.open_to_precepting == 'Y')
				.map((mentor) => new Mentor(
					mentor.fname,
					mentor.lname,
					mentor.guid,
					mentor.organization,
					mentor.title,
					mentor.degree,
					mentor.open_to_precepting,
					mentor.avatar,
					mentor.projects,
					mentor.linkedin,
					mentor.state,
					mentor.city,
					mentor.sectors
				));

				projects.map((project) => {
					const mentor = this.mentors.find(m => m.guid === project.mentor_guid);
					this.mentorProjects.push({
						id: project.id,
						project_title: project.project_title,
						title: mentor ? this.helperService.ArrayToCSV(mentor.title) : '',
						preceptor: mentor ? `${mentor.fname} ${mentor.lname}` : '',
						organization: mentor ? mentor.organization : '',
						user_degree: mentor ? this.helperService.ArrayToCSV(mentor.degree) : '',
						mentor_guid: project.mentor_guid
					});
				});
				this.isPageLoading = false;
			},
			error: (error: string) => {
				this.isPageLoading = false;
				this.alertsService.addErrorAlert(error);
			}
		});


		this.homeForm = new FormGroup({
			'sector_search': new FormControl(null)
		});
		this.sectors = this.sessionStorage.getSectors();
	}

	OpenMentor(id: string): void {
		this.router.navigate(['/view-mentor', id]);
	}

	OpenMentorProject(id: string): void {
		this.router.navigate(['/view-mentor-project', id]);
	}

	SectorText(m: Mentor): string {
		let retval = '';
		m.sectors.forEach((m) => {
			retval += '<small class="d-inline-flex mb-2 me-1 px-2 py-1 fw-semibold text-dark bg-light-subtle border border-light-subtle rounded-2">' + m.sector_name + '</small>';
		});

		return retval;
	}

	TitleText(m: Mentor): string {
		let retval = '';
		m.title.forEach((t) => {
			retval += '<small class="d-inline-flex mb-2 me-1 px-2 py-1 fw-semibold text-dark bg-light-subtle border border-light-subtle rounded-2">' + t + '</small>';
		});

		return retval;
	}
}

export interface MentorProjectMenu {
	'id': string;
	'title': string;
	'preceptor': string;
	'project_title': string;
	'organization': string;
	'user_degree': string;
	'mentor_guid': string;
}