import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IstudentConnectionRequest } from './requests/IstudentConnectionRequest';
import { IstudentConnectionResponse } from './requests/IstudentConnectionResponse';

@Injectable({
	providedIn: 'root'
})
export class RequestConnectionService {

	constructor(private http: HttpClient) { }

	submitStudentConnection(data: IstudentConnectionRequest): Observable<IstudentConnectionResponse>{
		return this.http.post<IstudentConnectionResponse>(
			environment.apiUrl + '/studentuser/student_connection', data)
		.pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}
