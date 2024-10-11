import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IcreateUserRequest } from './requests/IcreateUserRequest';
import { IcreateUserResponse } from './requests/IcreateUserResponse';

@Injectable({
	providedIn: 'root'
})
export class CreateUserService {

	constructor(private http: HttpClient) { }

	create(postvars: IcreateUserRequest): Observable<IcreateUserResponse> {
		return this.http.post<IcreateUserResponse>(environment.apiUrl + '/superadminuser/users/', postvars).pipe(
			map((response: IcreateUserResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}
