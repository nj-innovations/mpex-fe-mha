import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IstringMessageResponse } from '../../../core/requests/IstringMessageResponse';
import { IupdateUserRequest } from './requests/IupdateUserRequest';

@Injectable({
	providedIn: 'root'
})
export class UpdateUserService {

	constructor(private http: HttpClient) { }

	update(id: number, putvars: IupdateUserRequest): Observable<IstringMessageResponse> {
		return this.http.put<IstringMessageResponse>(environment.apiUrl + '/superadminuser/users/' + id, putvars).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}
