import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-view-mentor-project',
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule],
	templateUrl: './view-mentor-project.component.html',
	styleUrl: './view-mentor-project.component.css'
})
export class ViewMentorProjectComponent {
	projectForm!: FormGroup;
	alertMessage = '';
	id = '';
	user_id = 0;
	isPageLoading = true;
	faSpinner = faSpinner;
}
