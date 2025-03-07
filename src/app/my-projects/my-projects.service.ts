import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IgetMyProjectsResponse } from './requests/IgetMyProjectsResponse';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { IMentorProjectRequirements } from '../users/mentor-projects/requests/IMentorProjectRequirements';

@Injectable({
	providedIn: 'root'
})
export class MyProjectsService {

	constructor(private http: HttpClient) { }

	getProjects(): Observable<IgetMyProjectsResponse[]> {
		return this.http.get<IgetMyProjectsResponse[]>(environment.apiUrl + '/mentoruser/mentor_projects')
		.pipe(map(
			(response: IgetMyProjectsResponse[]) => {
				return response;
			}
		)
		,catchError (
			(error) => {
				return throwError(() => new Error(error.error.message))
			}
		));
	}

	updateMyProjectRequirements(id: string, req: string): Observable<IMentorProjectRequirements> {
		let putVars = {'requirement_text': req};
		return this.http.put<IMentorProjectRequirements>(environment.apiUrl + '/mentoruser/mentor_project_requirements/' + id, putVars).pipe(
			map((response: IMentorProjectRequirements) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	createMyProjectRequirements(mentor_project_id: string, req: string): Observable<IMentorProjectRequirements> {
		let postVars = {'requirement_text': req};
		return this.http.post<IMentorProjectRequirements>(environment.apiUrl + '/mentoruser/mentor_project_requirements/'
			+ mentor_project_id, postVars).pipe(
			map((response: IMentorProjectRequirements) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	deleteMyProjectRequirements(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentoruser/mentor_project_requirements/' + id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
}
