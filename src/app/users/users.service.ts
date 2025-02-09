import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IgetUsersResponse } from './requests/IgetUsersResponse';
import { IusersRequest } from './requests/IuserRequest';
import { IgetClientAdminUserDropdown } from './requests/IgetClientAdminUserDropdown';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { IupdateUsersRequest } from './requests/IupdateUserRequest';
import { IcreateUsersRequest } from './requests/IcreateUserRequest';

@Injectable({ providedIn: 'root' })
export class UsersService {

	constructor(private http: HttpClient) {}

	getAllUsers(user_role: number): Observable<IgetUsersResponse[]>{
		return this.http.get<IgetUsersResponse[]>(environment.apiUrl + '/clientadminuser/users/?user_role=' + user_role).pipe(
			map((response: IgetUsersResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	getUser(id: number): Observable<IusersRequest>{
		return this.http.get<IusersRequest>(environment.apiUrl + '/clientadminuser/users/' + id).pipe(
			map((response: IusersRequest) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
	
	getDropdowns(): Observable<IgetClientAdminUserDropdown>{
		return this.http.get<IgetClientAdminUserDropdown>(environment.apiUrl + '/clientadminuser/dropdowns?mode=roles,sectors').pipe(
			map((response: IgetClientAdminUserDropdown) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	updateUser(id: number, putvars: IupdateUsersRequest): Observable<IstringMessageResponse> {
		return this.http.put<IstringMessageResponse>(environment.apiUrl + '/clientadminuser/users/' + id, putvars).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	createUser(postvars: IcreateUsersRequest): Observable<IstringMessageResponse> {
		return this.http.post<IstringMessageResponse>(environment.apiUrl + '/clientadminuser/users', postvars).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}