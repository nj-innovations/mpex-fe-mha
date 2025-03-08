import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../core/alerts/alerts.service';
import { LocalStorageService } from '../core/local-storage.service';
import { MyProjectsService } from './my-projects.service';
import { IgetMyProjectsResponse } from './requests/IgetMyProjectsResponse';
import { UpdateMyProjectsModalComponent } from './update-my-projects-modal/update-my-projects-modal.component';
import { IstoreMyProjectsResponse } from './requests/IstoreMyProjectsResponse';
import { CreateMyProjectsModalComponent } from './create-my-projects-modal/create-my-projects-modal.component';
import { DeleteMyProjectsModalComponent } from './delete-my-projects-modal/delete-my-projects-modal.component';

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
		private modalService: NgbModal, private storageService: LocalStorageService) { }

	ngOnInit(): void {
		this.projectService.getProjects().subscribe({
			next: (response: IgetMyProjectsResponse[]) => {
				this.myProjects = response;
				console.log(response);
				this.isPageLoading = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
				this.isPageLoading = false;
			}
		});
	}

	createProject() {
		this.createModalRef = this.modalService.open(CreateMyProjectsModalComponent, {
			ariaLabelledBy: 'Create Project',
			size: 'lg'
		});

		this.createModalRef.result.then(
			(result: IstoreMyProjectsResponse) => {
				this.myProjects.unshift({
					'id': result.id,
					'project': result.project,
					'created_at': result.created_at,
					'requirements': []
				});
				console.log(result);
			},
			(error: string) => {
				if (error != '') {
					this.alertsService.addErrorAlert(error);
				}
			}
		);
	}

	updateProject(index: number) {
		this.updateModalRef = this.modalService.open(UpdateMyProjectsModalComponent, {
			ariaLabelledBy: 'Update Project',
			size: 'lg'
		});
		this.updateModalRef.componentInstance.project = this.myProjects[index];

		this.updateModalRef.result.then(
			(result: IstoreMyProjectsResponse) => {
				this.myProjects[index].project=result.project;
			},
			(error: string) => {
				if (error != '') {
					this.alertsService.addErrorAlert(error);
				}
			}
		);
	}

	deleteProject(index: number) {
		this.deleteModalRef = this.modalService.open(DeleteMyProjectsModalComponent, {
			ariaLabelledBy: 'Delete Project',
			size: 'lg'
		});
		this.deleteModalRef.componentInstance.project = this.myProjects[index];

		this.deleteModalRef.result.then(
			(result: string) => {
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
