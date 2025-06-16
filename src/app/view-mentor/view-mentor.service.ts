import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IviewMentorResponse } from './requests/IviewMentorResponse';

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
}
