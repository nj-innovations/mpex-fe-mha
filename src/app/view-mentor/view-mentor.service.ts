import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IviewMentorResponse } from './requests/IviewMentorResponse';
import { IstudentConnectionResponse } from './requests/IstudentConnectionResponse';
import { IstudentConnectionRequest } from './requests/IstudentConnectionRequest';

@Injectable({
	providedIn: 'root'
})
export class ViewMentorService {

	constructor(private http: HttpClient) { }

	getMentor(guid: string): Observable<IviewMentorResponse> {
		return this.http.get<IviewMentorResponse>(
			environment.apiUrl + '/studentuser/mentors/' + guid)
		.pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

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
