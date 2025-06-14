import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IgetMyProjectsResponse } from './requests/IgetMyProjectsResponse';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { IstoreMyProjectsRequest } from './requests/IstoreMyProjectsRequest';
import { IstoreMyProjectsResponse } from './requests/IstoreMyProjectsResponse';
import { ImentorProjectRequirements } from '../mentor-projects/requests/ImentorProjectRequirements';

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

	createMyProject(postvars: IstoreMyProjectsRequest): Observable<IstoreMyProjectsResponse> {
		return this.http.post<IstoreMyProjectsResponse>(environment.apiUrl + '/mentoruser/mentor_projects', postvars).pipe(
			map((response: IstoreMyProjectsResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	updateMyProject(id: string, putvars: IstoreMyProjectsRequest): Observable<IstoreMyProjectsResponse> {
		return this.http.put<IstoreMyProjectsResponse>(environment.apiUrl + '/mentoruser/mentor_projects/' + id, putvars).pipe(
			map((response: IstoreMyProjectsResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	deleteMyProject(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentoruser/mentor_projects/' + id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	updateMyProjectRequirements(id: string, req: string): Observable<ImentorProjectRequirements> {
		let putVars = {'requirement_text': req};
		return this.http.put<ImentorProjectRequirements>(environment.apiUrl + '/mentoruser/mentor_project_requirements/' + id, putVars).pipe(
			map((response: ImentorProjectRequirements) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	createMyProjectRequirements(mentor_project_id: string, req: string): Observable<ImentorProjectRequirements> {
		let postVars = {'requirement_text': req};
		return this.http.post<ImentorProjectRequirements>(environment.apiUrl + '/mentoruser/mentor_project_requirements/'
			+ mentor_project_id, postVars).pipe(
			map((response: ImentorProjectRequirements) => {
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
