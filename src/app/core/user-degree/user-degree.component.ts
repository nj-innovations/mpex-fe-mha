import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-degree',
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
    templateUrl: './user-degree.component.html',
    styleUrl: './user-degree.component.css'
})
export class UserDegreeComponent implements OnInit {
	@Input() existingUserDegree: null | string[] = [];
	@Output() notify: EventEmitter<any[]> = new EventEmitter<any[]>();
	degrees: string[] = [];
	faXmark = faXmark;
	degreeForm!: FormGroup;

	ngOnInit() {
		this.degreeForm = new FormGroup({
			'new_degree': new FormControl(null, Validators.required),
		});
		this.degrees = (this.existingUserDegree != null) ? this.existingUserDegree : [];
	}

	deleteDegree(i: number): void {
		this.degrees.splice(i, 1);
		this.notifyParent();
	}

	addDegree(): void {
		const d = this.degreeForm.value.new_degree;
		if(d != ''){
			this.degrees.push(d);
			this.degreeForm.patchValue({new_degree: ''});
			this.notifyParent();
		}
	}

	notifyParent(): void{
		this.notify.emit(this.degrees);
	}
}