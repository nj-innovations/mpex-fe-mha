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
			'project_title': new FormControl(null, Validators.required),
			'project_description': new FormControl(null, Validators.required),
			'student_responsibilities': new FormControl(null, Validators.required),
			'format_location': new FormControl(null, Validators.required),
			'payment': new FormControl(null, Validators.required),
		});
	}

	Save(): void {
		const postVars = {'project_title': this.projectForm.value.project_title, 'project_description': this.projectForm.value.project_description};
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
