import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	constructor(private http: HttpClient) { }

	getExitAdminToken(): Observable<IexitAdminResponse> {
		return this.http.get<IexitAdminResponse>(environment.apiUrl + '/auth/exit-admin', {})
		.pipe(map(
			(response: IexitAdminResponse) => {
				return response;
			}
		)
		, catchError (
			(error) => {
				return throwError(() => new Error(error.error.message))
			}
		));
	}
}

export interface IexitAdminResponse {
	'url': string;
}