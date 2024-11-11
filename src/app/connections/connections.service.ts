import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IconnectionsResponse } from './requests/IconnectionsResponse';
import { IsingleConnectionResponse } from './requests/IsingleConnectionResponse';

@Injectable({
	providedIn: 'root'
})
export class ConnectionsService {

	constructor(private http: HttpClient) { }

	getConnections(): Observable<IconnectionsResponse[]> {
		return this.http.get<IconnectionsResponse[]>(environment.apiUrl + '/clientadminuser/student_connection')
		.pipe(map(
			(response: IconnectionsResponse[]) => {
				return response;
			}
		)
		,catchError (
			(error) => {
				return throwError(() => new Error(error.error.message))
			}
		));
	}

	getSingleConnection(id: string): Observable<IsingleConnectionResponse> {
		return this.http.get<IsingleConnectionResponse>(environment.apiUrl + '/clientadminuser/student_connection/' + id)
		.pipe(map(
			(response: IsingleConnectionResponse) => {
				return response;
			}
		)
		,catchError (
			(error) => {
				return throwError(() => new Error(error.error.message))
			}
		));
	}

	updateConnection(id: string, status: string, dept_comments: string): Observable<IsingleConnectionResponse> {
		const putVars = {'status': status, 'dept_comments': dept_comments}
		return this.http.put<IsingleConnectionResponse>(environment.apiUrl + '/clientadminuser/student_connection/' + id, putVars)
		.pipe(map(
			(response: IsingleConnectionResponse) => {
				return response;
			}
		)
		,catchError (
			(error) => {
				return throwError(() => new Error(error.error.message))
			}
		));
	}
}
