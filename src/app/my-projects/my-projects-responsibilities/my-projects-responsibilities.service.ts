import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IgetResponsibilitiesResponse } from '../../mentor-projects/update-mentor-project/requests/IgetResponsibilitiesResponse';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { ImentorProjectResponsibilities } from '../../mentor-projects/requests/ImentorProjectResponsibilities';

@Injectable({
	providedIn: 'root'
})
export class MyProjectsResponsibilitiesService {

	constructor(private http: HttpClient) { }
	
	createMyProjectResponsibilities(mentor_project_id: string, req: string): Observable<ImentorProjectResponsibilities> {
		let postVars = {'responsibility_text': req};
		return this.http.post<ImentorProjectResponsibilities>(environment.apiUrl + '/mentor_projects/responsibilities/mentoruser/'
			+ mentor_project_id, postVars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	updateMyProjectResponsibilities(id: string, req: string): Observable<ImentorProjectResponsibilities> {
		let putVars = {'responsibility_text': req};
		return this.http.put<ImentorProjectResponsibilities>(environment.apiUrl + '/mentor_projects/responsibilities/mentoruser/' + id, putVars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	deleteMyProjectResponsibilities(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentor_projects/responsibilities/mentoruser/' + id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
}
