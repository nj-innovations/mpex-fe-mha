import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MyProjectsService } from '../my-projects.service';
import { IstoreMyProjectsRequest } from '../requests/IstoreMyProjectsRequest';


@Component({
	selector: 'app-create-my-projects-modal',
	imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
	templateUrl: './create-my-projects-modal.component.html',
	styleUrl: './create-my-projects-modal.component.css'
})
export class CreateMyProjectsModalComponent implements OnInit  {
	projectForm!: FormGroup;
	alertMessage = '';
	user_id = 0;

	constructor(public activeModal: NgbActiveModal, public projectService: MyProjectsService) {
	}
	
	ngOnInit() {
		this.projectForm = new FormGroup({
			'project': new FormControl(null, Validators.required),
		});
	}

	Save(): void {
		const postVars = {'project': this.projectForm.value.project}
		this.projectService.createMyProject(postVars).subscribe({
			next: (data: IstoreMyProjectsRequest) => {
				this.activeModal.close(data);				
			},
			error: (error: string) => {
				this.alertMessage = 'Unable to save Mentor Project';
			},
			complete: () => {}
		});
	}

	closeAlert(): void {
		this.alertMessage = '';
	}	
}
