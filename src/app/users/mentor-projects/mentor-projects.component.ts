import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faCirclePlus, faCircleMinus, faFilePen, faFileXmark, faFileCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateMentorProjectModalComponent } from './create-mentor-project-modal/create-mentor-project-modal.component';
import { IcreateMentorProjectResponse } from './create-mentor-project-modal/request/IcreateMentorProjectResponse';
import { DeleteMentorProjectModalComponent } from './delete-mentor-project-modal/delete-mentor-project-modal.component';
import { UpdateMentorProjectModalComponent } from './update-mentor-project-modal/update-mentor-project-modal.component';
import { IupdateMentorProjectResponse } from './update-mentor-project-modal/request/IupdateMentorProjectResponse';
import { AlertsService } from '../../core/alerts/alerts.service';
import { PermissionsService } from '../../core/permissions.service';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { UsersService } from '../users.service';
import { ImentorProjectRequest } from '../requests/IuserRequest';


@Component({
	selector: 'app-mentor-projects',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
	templateUrl: './mentor-projects.component.html',
	styleUrl: './mentor-projects.component.css'
})
export class MentorProjectsComponent implements OnInit {
	@Input() mentorProjects: ImentorProjectRequest[] = [];
	@Input() user_id = 0;
	faFilePen = faFilePen;
	faFileCirclePlus = faFileCirclePlus;
	createModalRef?: NgbModalRef;
	deleteModalRef?: NgbModalRef;
	updateModalRef?: NgbModalRef;
	faFileXmark = faFileXmark;
	faCirclePlus = faCirclePlus;
	faCircleMinus = faCircleMinus;

	constructor(public usersService: UsersService, private alertsService: AlertsService,
		public permissions: PermissionsService, private modalService: NgbModal) {}
	
	ngOnInit() {
	}
	
	createProject(){
		this.createModalRef = this.modalService.open(CreateMentorProjectModalComponent, {
			ariaLabelledBy: 'Create Project',
			size: 'lg'
		});		
		this.createModalRef.componentInstance.user_id = this.user_id;

		this.createModalRef.result.then(
			(result: IcreateMentorProjectResponse) => {
				this.mentorProjects.push(result);
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);
	}

	updateMentorProject(project: ImentorProjectRequest){
		this.updateModalRef = this.modalService.open(UpdateMentorProjectModalComponent, {
			ariaLabelledBy: 'Update Project',
			size: 'lg'
		});
		this.updateModalRef.componentInstance.project = project;

		this.updateModalRef.result.then(
			(result: IupdateMentorProjectResponse) => {
				console.log(result);
				let i = this.mentorProjects.findIndex((x) => {
					return x.id == result.id
				});
				this.mentorProjects[i] = result;
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);
	}

	deleteMentorProject(project: ImentorProjectRequest){
		this.deleteModalRef = this.modalService.open(DeleteMentorProjectModalComponent, {
			ariaLabelledBy: 'Delete Project',
			size: 'lg'
		});		
		this.deleteModalRef.componentInstance.project = project;

		this.deleteModalRef.result.then(
			(result: IstringMessageResponse) => {
				let i = this.mentorProjects.findIndex((x) => {
					return x.id == project.id
				});
				this.mentorProjects.splice(i, 1);	
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);		
	}
}
