import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faCirclePlus, faCircleMinus, faFilePen, faFileXmark, faFileCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteMentorProjectModalComponent } from './delete-mentor-project-modal/delete-mentor-project-modal.component';
import { Router } from '@angular/router';
import { AlertsService } from '../core/alerts/alerts.service';
import { PermissionsService } from '../core/permissions.service';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
//import { ImentorProjectRequest } from '../users/requests/IuserRequest';
import { UsersService } from '../users/users.service';
import { IgetMentorProjectByMentor } from './requests/IgetMentorProjectByMentor';


@Component({
    selector: 'app-mentor-projects',
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
    templateUrl: './mentor-projects.component.html',
    styleUrl: './mentor-projects.component.css'
})
export class MentorProjectsComponent implements OnInit {
	@Input() mentorProjects: IgetMentorProjectByMentor[] = [];
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
		public permissions: PermissionsService, private modalService: NgbModal, private router: Router) {}
	
	ngOnInit() {
	}
	
	createProject(){
		this.router.navigate(['/mentor_projects/create/' + this.user_id]);
	}

	updateMentorProject(id: string){
		this.router.navigate(['/mentor_projects/update/' + id]);
	}

	deleteMentorProject(project: IgetMentorProjectByMentor){
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
				this.alertsService.addSuccessAlert('Project deleted successfully');
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);		
	}
}
