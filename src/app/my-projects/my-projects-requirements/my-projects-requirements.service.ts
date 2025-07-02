import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { ImentorProjectRequirements } from '../../mentor-projects/requests/ImentorProjectRequirements';

@Injectable({
	providedIn: 'root'
})
export class MyProjectsRequirementsService {

	constructor(private http: HttpClient) { }

	createMyProjectRequirements(mentor_project_id: string, req: string): Observable<ImentorProjectRequirements> {
		let postVars = {'requirement_text': req};
		return this.http.post<ImentorProjectRequirements>(environment.apiUrl + '/mentor_projects/requirements/mentoruser/'
			+ mentor_project_id, postVars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	deleteMyProjectRequirements(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentor_projects/requirements/mentoruser/' + id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}	

	updateMyProjectRequirements(id: string, req: string): Observable<ImentorProjectRequirements> {
		let putVars = {'requirement_text': req};
		return this.http.put<ImentorProjectRequirements>(environment.apiUrl + '/mentor_projects/requirements/mentoruser/' + id, putVars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
}
