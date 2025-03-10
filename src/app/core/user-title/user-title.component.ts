import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-title',
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
    templateUrl: './user-title.component.html',
    styleUrl: './user-title.component.css'
})
export class UserTitleComponent implements OnInit {
	@Input() existingUserTitle: null | string[] = [];
	@Output() notify: EventEmitter<any[]> = new EventEmitter<any[]>();
	titles: string[] = [];
	faXmark = faXmark;
	titleForm!: FormGroup;

	ngOnInit() {
		this.titleForm = new FormGroup({
			'new_title': new FormControl(null, Validators.required),
		});
		this.titles = (this.existingUserTitle != null) ? this.existingUserTitle : [];
	}

	deleteTitle(i: number): void {
		this.titles.splice(i, 1);
		this.notifyParent();
	}

	addTitle(): void {
		const d = this.titleForm.value.new_title;
		if(d != ''){
			this.titles.push(d);
			this.titleForm.patchValue({new_title: ''});
			this.notifyParent();
		}
	}

	notifyParent(): void{
		this.notify.emit(this.titles);
	}
}