import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../core/alerts/alerts.service';
import { ConnectionsService } from '../connections.service';
import { IsingleConnectionResponse } from '../requests/IsingleConnectionResponse';
import { LocalStorageService } from '../../core/local-storage.service';

@Component({
    selector: 'app-update-connection-modal',
    imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, DatePipe],
    templateUrl: './update-connection-modal.component.html',
    styleUrl: './update-connection-modal.component.css'
})
export class UpdateConnectionModalComponent implements OnInit {
	connectionForm!: FormGroup;
	student_connection!: IsingleConnectionResponse
	connection_id = '';
	error_message = '';
	visibleErrorAlert = false;
	status = '';
	studentName = '';
	mentorName = '';
	createdAt = '';
	studentComments = '';
	deptComments = '';
	linkedin = '';
	statusRS: string[] = [];
	
	constructor(public activeModal: NgbActiveModal, public alertsService: AlertsService,
		public connectionService: ConnectionsService, public sessionService: LocalStorageService) {}

	ngOnInit() {
		this.connectionForm = new FormGroup({
			'status': new FormControl(null, Validators.required),
			'dept_comments': new FormControl(null)
		});

		this.connectionService.getSingleConnection(this.connection_id).subscribe({
			next: (response: IsingleConnectionResponse) => {
				this.statusRS = this.sessionService.getStudentConnectionStatus();
				this.studentName = response.student_fname + ' ' + response.student_lname;
				this.mentorName = response.mentor_fname + ' ' + response.mentor_lname;
				this.createdAt = response.created_at;
				this.studentComments = response.student_comments ?? '';
				this.deptComments = response.dept_comments ?? '';
				this.status = response.status;
				this.connectionForm.patchValue({
					'status': this.status,
					'dept_comments': this.deptComments
				})
			},
			error: (error: string) => {
				this.error_message = error;
			}
		});
	}

	Save(): void {
		this.closeErrorAlert();
		this.connectionService.updateConnection(this.connection_id,
			this.connectionForm.value.status, this.connectionForm.value.dept_comments).subscribe({
			next: (response: IsingleConnectionResponse) => {
				this.activeModal.close(response);
			},
			error: (error: string) => {
				this.visibleErrorAlert = true;
				this.error_message = error;
			},
			complete: () => {
			}
		});
	}

	closeErrorAlert(): void {
		this.visibleErrorAlert = false;
	}
}
