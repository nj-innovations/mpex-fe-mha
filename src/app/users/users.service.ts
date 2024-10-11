import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IgetUsersResponse } from './requests/IgetUsersResponse';

@Injectable({ providedIn: 'root' })
export class UsersService {

	constructor(private http: HttpClient) {}

	getAllUsers(): Observable<IgetUsersResponse[]>{
		return this.http.get<IgetUsersResponse[]>(environment.apiUrl + '/superadminuser/users').pipe(
			map((response: IgetUsersResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	//updateClientLink
	///superadminuser/clientuserlinks/ac0d4a1d-e465-48e2-85bc-dc7c6479f5f6
}