import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { AlertsService } from '../core/alerts/alerts.service';
import { IgetMentorsResponse } from './requests/IgetMentorsResponse';
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
	mentors?: Mentor[] = [];
	profileModalRef?: NgbModalRef;
	searchMentorModelRef?: NgbModalRef;
	selectedPersonType = 'b';
	sectors?: IdropdownsResponse[] = [];
	visibleProfileCount = 1;

	constructor(private homeService: HomeService, private alertsService: AlertsService,
		private modalService: NgbModal, public sessionStorage: LocalStorageService,
		private profileModelService: ProfileModalService, public helperService: HelperService,
		public searchService: SearchMentorModalService) {
	}

	ngOnInit() {
		this.homeService.getMentors().subscribe({
			next: (response: IgetMentorsResponse[]) => {
				const m = response.length;
				for(let i = 0; i < m; i++){
					this.mentors?.push(new Mentor(
						response[i].fname,
						response[i].lname,
						response[i].guid,
						response[i].organization,
						response[i].title,
						response[i].degree,
						response[i].experiences_hosted,
						response[i].past_student_project_titles,
						response[i].open_to_precepting,
						response[i].open_to_mentoring,
						response[i].projects_available,
						response[i].contact_information,
						response[i].is_preceptor,
						response[i].is_mentor,
						response[i].avatar,
						response[i].linkedin,
						response[i].state,
						response[i].city,
						response[i].sectors,
						response[i].mentor_projects
					));
				}
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading = false;
			}
		});
		this.homeForm = new FormGroup({
			'sector_search': new FormControl(null),
			'person_name_search': new FormControl(null)
		});
		this.sectors = this.sessionStorage.getSectors();
	}

	OpenProfile(profile: Mentor): void {
		this.profileModelService.setProfile(profile);
		this.profileModalRef = this.modalService.open(ProfileModalComponent, {
			ariaLabelledBy: 'View Profile',
			size: 'md'
		});
	}

	PersonTypeClick(pt: string): void {
		this.selectedPersonType = pt;
		this.FilterMentors();
	}

	FilterMentors(): void {
		const selectedSectors = this.searchService.getSelectedSectors();
		let is_preceptor = '';
		let is_mentor = '';
		let foundSector = true;
		let visibleProfiles: string[] = [];
		let nameSearchStr = this.homeForm.value.person_name_search;
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
					if(nameSearchStr != null)
					{
						if(!m.fname.toLowerCase().startsWith(nameSearchStr.toLowerCase())
							&& !m.lname.toLowerCase().startsWith(nameSearchStr.toLowerCase())
						)
						{
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
			//retval += '<div>&bull;&nbsp;' + m.sector_name + '</div>';
			retval += '<small class="d-inline-flex mb-2 me-1 px-2 py-1  fw-semibold text-dark bg-light-subtle border border-light-subtle rounded-2">' + m.sector_name + '</small>';
			//retval += '<span class="badge text-bg-light p-2 bg-light-subtle border border-light-subtle mb-2">' + m.sector_name + '</span>';
		});

		return retval;
	}

	TitleText(m: Mentor): string {
		let retval = '';
		m.title.forEach((t) => {
			//retval += '<div>&bull;&nbsp;' + t + '</div>';
			retval += '<small class="d-inline-flex mb-2 me-1 px-2 py-1 fw-semibold text-dark bg-light-subtle border border-light-subtle rounded-2">' + t + '</small>';
			//retval += '<span class="badge text-bg-light p-2 bg-light-subtle border border-light-subtle mb-2">' + t + '</span>';
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

	UpdateNameSearch(){
		this.FilterMentors();
	}
}
