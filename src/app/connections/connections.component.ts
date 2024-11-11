import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionsService } from './connections.service';
import { AlertsService } from '../core/alerts/alerts.service';
import { IconnectionsResponse } from './requests/IconnectionsResponse';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectionsModel } from './connections.model';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UpdateConnectionModalComponent } from './update-connection-modal/update-connection-modal.component';
import { IsingleConnectionResponse } from './requests/IsingleConnectionResponse';

@Component({
	selector: 'app-connections',
	standalone: true,
	imports: [MatTableModule, MatSortModule, MatFormFieldModule,
		MatInputModule, FontAwesomeModule, ReactiveFormsModule, DatePipe],
	templateUrl: './connections.component.html',
	styleUrl: './connections.component.css'
})
export class ConnectionsComponent implements OnInit {
	@ViewChild(MatSort) sort!: MatSort;
	isPageLoading = true;
	displayedColumns: string[] = ['student', 'mentor', 'organization', 'status', 'created_at'];
	dataSource = new MatTableDataSource<ConnectionsModel>();
	connections: ConnectionsModel[] = [];
	connectionsForm!: FormGroup;
	faSpinner = faSpinner;
	connectionModalRef?: NgbModalRef;

	constructor(public connectionService: ConnectionsService, public alertsService: AlertsService,
		private modalService: NgbModal) { }

	applyFilter(filterValue: Event) {
		this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
	}

	ngOnInit(): void {
		this.connectionService.getConnections().subscribe({
			next: (response: IconnectionsResponse[]) => {
				//let connections: ConnectionsModel[] = [];
				 this.connections = response.map((r) => {
					return new ConnectionsModel(r);
				 });
				 this.dataSource = new MatTableDataSource(this.connections);
				 this.isPageLoading = false;
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading = false;
			}
		});
	}

	sortConnections(): void {
		this.dataSource.sort = this.sort;
	}

	selectRow(row: ConnectionsModel){
		this.connectionModalRef = this.modalService.open(UpdateConnectionModalComponent, {
			ariaLabelledBy: 'View Student Connection',
			size: 'lg'
		});
		this.connectionModalRef.componentInstance.connection_id = row.id;

		this.connectionModalRef.result.then(
			(result: IsingleConnectionResponse) => {
				let i = this.connections.findIndex((x) => {
					return x.id == result.id
				});
				this.connections[i].status = result.status;
				this.dataSource.data = this.connections;
				//this.paginator._changePageSize(this.paginator.pageSize);
			},
			(error: string) => {
				if(error != ''){
					this.alertsService.addErrorAlert(error);
				}
			}
		);	
	}
}
