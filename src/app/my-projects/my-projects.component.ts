import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../core/alerts/alerts.service';
import { LocalStorageService } from '../core/local-storage.service';
import { MyProjectsService } from './my-projects.service';
import { IgetMyProjectsResponse } from './requests/IgetMyProjectsResponse';
import { DeleteMyProjectsModalComponent } from './delete-my-projects-modal/delete-my-projects-modal.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-my-projects',
	imports: [],
	templateUrl: './my-projects.component.html',
	styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent implements OnInit {
	isPageLoading = true;
	myProjects: IgetMyProjectsResponse[] = [];
	createModalRef?: NgbModalRef;
	deleteModalRef?: NgbModalRef;
	updateModalRef?: NgbModalRef;

	constructor(public projectService: MyProjectsService, public alertsService: AlertsService,
		private modalService: NgbModal, private storageService: LocalStorageService,
		private router: Router) { }

	ngOnInit(): void {
		this.projectService.getProjects().subscribe({
			next: (response: IgetMyProjectsResponse[]) => {
				this.myProjects = response;
				this.isPageLoading = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
				this.isPageLoading = false;
			}
		});
	}

	createProject() {
		this.router.navigate(['/projects/create']);
	}

	updateProject(id: string) {
		this.router.navigate(['/projects/update', id]);
	}

	deleteProject(index: number) {
		this.alertsService.clearAlerts();
		this.deleteModalRef = this.modalService.open(DeleteMyProjectsModalComponent, {
			ariaLabelledBy: 'Delete Project',
			size: 'lg'
		});
		this.deleteModalRef.componentInstance.project = this.myProjects[index];

		this.deleteModalRef.result.then(
			(result: string) => {
				this.alertsService.addSuccessAlert('Project deleted successfully');
				this.myProjects.splice(index, 1);
			},
			(error: string) => {
				if (error != '') {
					this.alertsService.addErrorAlert(error);
				}
			}
		);
	}
}
