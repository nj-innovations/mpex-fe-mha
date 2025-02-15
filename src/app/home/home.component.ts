import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { AlertsService } from '../core/alerts/alerts.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../environments/environment';
import { NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { ProfileModalService } from './profile-modal/profile-modal.service';
import { HelperService } from '../core/helper.service';
import { LocalStorageService } from '../core/local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchMentorModalService } from './search-mentor-modal/search-mentor-modal.service';
import { Mentor } from '../models/Mentor';
import { IdropdownsResponse } from '../index/requests/IdropdownsResponse';
import { forkJoin, finalize } from 'rxjs';
import { IgetMentorProjectsResponse } from './requests/IgetMentorProjectsResponse';
import { MentorProject } from '../models/MentorProject';

@Component({
	selector: 'app-home',
	standalone: true,
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
	//mentorProjects: IgetMentorProjectsResponse[] = [];
	mentorProjects: MentorProject[] = [];
	visiblePreceptorList = false;
	visibleProjectList = true;

	constructor(private homeService: HomeService, private alertsService: AlertsService,
		private modalService: NgbModal, public sessionStorage: LocalStorageService,
		private profileModelService: ProfileModalService, public helperService: HelperService,
		public searchService: SearchMentorModalService) {
	}

	ngOnInit() {
		forkJoin({
			getMentors: this.homeService.getMentors(),
			getMentorProjects: this.homeService.getMentorProjects()
		}).pipe(
			finalize(() => this.isPageLoading = false)
		).subscribe({
			next: (response) => {
				const mentorProjectsTemp = response.getMentorProjects;
				this.mentors = response.getMentors
				.filter((r) => r.open_to_precepting == 'Y')
				.map((mentor) => new Mentor(
					mentor.fname,
					mentor.lname,
					mentor.guid,
					mentor.organization,
					mentor.title,
					mentor.degree,
					mentor.open_to_precepting,
					mentor.open_to_mentoring,
					mentor.projects_available,
					mentor.is_preceptor,
					mentor.is_mentor,
					mentor.avatar,
					mentor.linkedin,
					mentor.state,
					mentor.city,
					mentor.sectors
				));
			
				mentorProjectsTemp.map((project) => {
					this.mentors.forEach((mentor) => {
						if(project.user_guid == mentor.guid){
							this.mentorProjects.push(new MentorProject(
								project.id,
								project.user_id,
								project.project,
								project.updated_at,
								mentor.fname,
								mentor.lname,
								project.organization,
								project.user_guid,
								mentor.title,
								mentor.degree
							));
						}
					});
				});
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}
		});

		this.homeForm = new FormGroup({
			'sector_search': new FormControl(null)
		});
		this.sectors = this.sessionStorage.getSectors();
	}

	OpenProfile(profile: Mentor): void {
		this.profileModelService.setProfile(profile);
		this.profileModelService.setMentorProjects(
			this.mentorProjects.filter((x) => x.user_guid == profile.guid)
		);
		this.profileModalRef = this.modalService.open(ProfileModalComponent, {
			ariaLabelledBy: 'View Profile',
			size: 'xl'
		});
	}

	OpenProjectProfile(project: MentorProject): void {
		const profile = this.mentors.filter((x) => x.guid == project.user_guid);
		this.profileModelService.setProfile(profile[0]);
		this.profileModelService.setMentorProjects(
			this.mentorProjects.filter((x) => x.user_guid == profile[0].guid)
		);
		this.profileModalRef = this.modalService.open(ProfileModalComponent, {
			ariaLabelledBy: 'View Profile',
			size: 'xl'
		});
	}

	FilterMentors(): void {
		const selectedSectors = this.searchService.getSelectedSectors();
		let is_preceptor = '';
		let is_mentor = '';
		let foundSector = true;
		let visibleProfiles: string[] = [];
		if(this.mentors != null){
			this.mentors.forEach(m => {
				is_mentor = m.is_mentor;
				is_preceptor = m.is_preceptor;
				if(
					(this.selectedPersonType == 'b') ||
					(this.selectedPersonType == 'm' && is_mentor == 'Y') ||
					(this.selectedPersonType == 'p' && is_preceptor == 'Y')
				){
					visibleProfiles.push(m.guid);
				}
				if(visibleProfiles.includes(m.guid)){
					if(selectedSectors.length > 0){
						foundSector = false;	
						selectedSectors.forEach((a) => {
							m.sectors.forEach((i) => {
								if(i.sector_id.toString() == a){
									foundSector = true;
								}
							});
						});
						if(!foundSector){
							const ind = visibleProfiles.indexOf(m.guid);
							if(ind >= 0){
								delete visibleProfiles[ind];
							}
						}						
					}
				}
			});
			this.mentors.forEach((v, i) => {
				if(visibleProfiles.includes(v.guid)){
					v.selectedProfile = 'Y';
				} else {
					v.selectedProfile = 'N';
				}
			});

			const stringsOnly = visibleProfiles.flatMap(f => !!f ? [f] : []);
			this.visibleProfileCount = stringsOnly.length;
		}
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

	ChangeSector(){
		if(this.homeForm.value.sector_search == ''){
			this.searchService.setSelectedSectors([]);
		} else {
			this.searchService.setSelectedSectors([this.homeForm.value.sector_search]);
		}
		this.FilterMentors();
	}
}
