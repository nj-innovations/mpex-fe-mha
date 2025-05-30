import { Component, OnInit } from '@angular/core';
import { MyProjectsService } from '../my-projects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IstoreMyProjectsRequest } from '../requests/IstoreMyProjectsRequest';

@Component({
	selector: 'app-my-projects-create',
	imports: [],
	templateUrl: './my-projects-create.component.html',
	styleUrl: './my-projects-create.component.css'
})
export class MyProjectsCreateComponent implements OnInit {
	projectForm!: FormGroup;
	alertMessage = '';
	user_id = 0;

	constructor(public projectService: MyProjectsService) {
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
		const postVars = {
			'project_title': this.projectForm.value.project_title, 'project_description': this.projectForm.value.project_description,
			'student_responsibilities': this.projectForm.value.student_responsibilities,
			'format_location': this.projectForm.value.format_location,
			'payment': this.projectForm.value.payment
		};
		this.projectService.createMyProject(postVars).subscribe({
			next: (data: IstoreMyProjectsRequest) => {
	
			},
			error: (error: string) => {
				this.alertMessage = 'Unable to save Mentor Project';
			},
			complete: () => {}
		});
	}
}
