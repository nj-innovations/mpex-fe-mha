import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IgetSuperAdminUserResponse } from './requests/IgetSuperAdminUserResponse';
import { IgetSuperAdminUserDropdown } from './requests/IgetSuperAdminUserDropdown';

@Injectable({ providedIn: 'root' })
export class SuperAdminUsersService {

	constructor(private http: HttpClient) {}

	getUser(id: number): Observable<IgetSuperAdminUserResponse>{
		return this.http.get<IgetSuperAdminUserResponse>(environment.apiUrl + '/superadminuser/users/' + id).pipe(
			map((response: IgetSuperAdminUserResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	getDropdowns(): Observable<IgetSuperAdminUserDropdown>{
		return this.http.get<IgetSuperAdminUserDropdown>(environment.apiUrl + '/superadminuser/dropdowns').pipe(
			map((response: IgetSuperAdminUserDropdown) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}