import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModalService } from './profile-modal.service';
import { IgetMentorProjects, IgetMentorsSector } from '../requests/IgetMentorsResponse';
import { HelperService } from '../../core/helper.service';
import { Mentor } from '../../models/Mentor';
import { AlertsService } from '../../core/alerts/alerts.service';
import { IstudentConnectionResponse } from '../requests/IstudentConnectionResponse';
import { IgetMentorProjectsResponse } from '../requests/IgetMentorProjectsResponse';
import { MentorProject } from '../../models/MentorProject';
//import { IgetMentorProjectsResponse } from '../requests/IgetMentorProjectsResponse_old';

@Component({
	selector: 'app-profile-modal',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule],
	templateUrl: './profile-modal.component.html',
	styleUrl: './profile-modal.component.css'
})
export class ProfileModalComponent implements OnInit {
	profileForm!: FormGroup;
	profile!: Mentor;
	mentor_guid = '';
	profileName = '';
	profileOrganization = '';
	profileTitle = '';
	profileProjectsAvailable = '';
	profilePastStudentProjectTitles: string[] = [];
	profileSectors: IgetMentorsSector[] = [];
	profileContactInformation = '';
	profileExperiencesHosted = 0;
	profileOpenToPrecept = 'No';
	profileOpenToMentor = 'No';
	profileMentorProjects: MentorProject[] = [];
	linkedin = '';
	visibleStudentComment = false;
	visibleSuccessAlert = false;
	visibleErrorAlert = false;
	
	constructor(public activeModal: NgbActiveModal, private profileModelService: ProfileModalService,
		public helperService: HelperService, public alertsService: AlertsService) {
	}

	ngOnInit() {
		const profile: Mentor = this.profileModelService.getProfile();
		this.profileMentorProjects = this.profileModelService.fetchMentorProjects();
		this.mentor_guid = profile.guid;
		this.profileName = profile.fname + ' ' + profile.lname + ', ' + profile.degree;
		this.profileTitle = this.helperService.ArrayToLines(profile.title);
		this.profileSectors = profile.sectors;
		this.profileOrganization = profile.organization;
		this.profileProjectsAvailable = profile.projects_available;
		this.linkedin = profile.linkedin;
		if(profile.open_to_precepting == 'Y'){
			this.profileOpenToPrecept = 'Yes';
		}
		if(profile.open_to_mentoring == 'Y'){
			this.profileOpenToMentor = 'Yes';
		}
		this.profileForm = new FormGroup({
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
		const postVars = {'mentor_guid': this.mentor_guid, 'student_comments': this.profileForm.value.student_comments ?? ''}
		this.profileModelService.submitStudentConnection(postVars).subscribe({
			next: (response: IstudentConnectionResponse) => {
				this.cancelMeetPerson();
				this.visibleSuccessAlert = true;
			},
			error: (error: string) => {
				this.visibleErrorAlert = true;
			},
			complete: () => {
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
