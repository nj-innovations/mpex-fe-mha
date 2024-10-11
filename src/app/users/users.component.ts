import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { AlertsService } from '../core/alerts/alerts.service';
import { IgetUsersResponse } from './requests/IgetUsersResponse';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-users',
	standalone: true,
	imports: [MatTableModule, MatSortModule, MatFormFieldModule,
		MatInputModule, FontAwesomeModule, ReactiveFormsModule],
	templateUrl: './users.component.html',
	styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
	@ViewChild(MatSort) sort!: MatSort;
	isPageLoading = true;
	displayedColumns: string[] = ['fname', 'lname', 'organization', 'client_name', 'role_name'];
	dataSource = new MatTableDataSource<IgetUsersResponse>();
	faCirclePlus = faCirclePlus;
	usersForm!: FormGroup;
	users: IgetUsersResponse[] = [];
	filteredUsers: IgetUsersResponse[] = [];

	constructor(private usersService: UsersService, private alertsService: AlertsService,
		private router: Router, private route: ActivatedRoute) { }

	applyFilter(filterValue: Event) {
		this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
	}

	ngOnInit() {
		this.alertsService.clearAlerts();
		this.usersService.getAllUsers().subscribe({
			next: (data: IgetUsersResponse[]) => {
				this.users = data;
				this.open_to_precepting_check('b');
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			},
			complete: () => {
				this.isPageLoading = false;
			}
		});

		this.usersForm = new FormGroup({
			'open_to_precepting': new FormControl(null),
			'open_to_mentoring': new FormControl(null)
		});

			
		switch (this.route.snapshot.queryParams['msg']) {
			case '1':
				this.alertsService.addSuccessAlert('User Successfully Updated');
				break;
			case '2':
			default:
				break;
		}
	}
	
	sortUsers(): void {
		this.dataSource.sort = this.sort;
	}

	selectRow(row: IgetUsersResponse){
		this.router.navigate(['/users/update', row.id]);
	}

	createUser() {
		this.router.navigate(['/users/create']);
	}

	open_to_precepting_check(i: string): void {
		let filteredUsers: IgetUsersResponse[] = [];
		switch(i){
			case 'y':
				filteredUsers = this.users.filter((x) => {return x.open_to_precepting == 'Y';});	
				break;
			case 'n':
				filteredUsers = this.users.filter((x) => {
					return (x.open_to_precepting == 'N' || x.open_to_precepting == null);
				});	
				break;
			case 'b':
				filteredUsers = this.users;
				break;
		}
		this.dataSource = new MatTableDataSource(filteredUsers);
	}
}
