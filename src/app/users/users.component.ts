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
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../core/local-storage.service';

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
	displayedColumns: string[] = ['fname', 'lname', 'organization', 'role_name',];
	dataSource = new MatTableDataSource<IgetUsersResponse>();
	faCirclePlus = faCirclePlus;
	usersForm!: FormGroup;
	users: IgetUsersResponse[] = [];
	filteredUsers: IgetUsersResponse[] = [];
	faSpinner = faSpinner;
	roleName = '';

	constructor(private usersService: UsersService, private alertsService: AlertsService,
		private router: Router, private route: ActivatedRoute, private storageService: LocalStorageService) { }

	applyFilter(filterValue: Event) {
		this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
	}

	ngOnInit() {
		this.alertsService.clearAlerts();
		this.route.params.subscribe((params) => {
			let menu_type = '';
			if(params['menu_type'] == undefined){
				menu_type = this.storageService.getValue('users_menu_type') ?? '3';
			} else {
				this.storageService.setValue('users_menu_type', params['menu_type']);
				menu_type = params['menu_type'];
			}
			this.isPageLoading = true;
			this.usersService.getAllUsers(parseInt(menu_type, 10)).subscribe({
				next: (data: IgetUsersResponse[]) => {
					this.users = data.map((u) => {
						if(u.role_name == 'Mentor'){
							u.role_name = 'Preceptor'
						}
						return u;
					});
					this.open_to_precepting_check('b');
					switch(menu_type){
						case '2':
							this.roleName = 'Admins';
							break;
						case '3':
							this.roleName = 'Preceptors';
							break;
						case '4':
							this.roleName = 'Students';
							break;
					}
				},
				error: (error: string) => {
					this.alertsService.addErrorAlert(error);
				},
				complete: () => {
					this.isPageLoading = false;
				}
			});			
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
				this.alertsService.addSuccessAlert('User Successfully Created');
				break;
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

	convertIsStudent(s: string): string {
		return s == 'Y' ? 'Yes' : '';
	}
}
