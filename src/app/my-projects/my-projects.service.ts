import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IgetMyProjectsResponse } from './requests/IgetMyProjectsResponse';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { IstoreMyProjectsRequest } from './requests/IstoreMyProjectsRequest';
import { IstoreMyProjectsResponse } from './requests/IstoreMyProjectsResponse';
import { ImentorProjectRequirements } from '../mentor-projects/requests/ImentorProjectRequirements';
import { MentorProjectDropdowns } from '../mentor-projects/mentor-projects.service';

@Injectable({
	providedIn: 'root'
})
export class MyProjectsService {

	constructor(private http: HttpClient) { }

	getProjects(): Observable<IgetMyProjectsResponse[]> {
		return this.http.get<IgetMyProjectsResponse[]>(environment.apiUrl + '/mentor_projects/base/mentoruser').pipe(
			catchError ((error) => {
				return throwError(() => new Error(error.error.message))
			})
		);
	}

	getSingleProject(id: string): Observable<IgetMyProjectsResponse> {
		return this.http.get<IgetMyProjectsResponse>(environment.apiUrl + '/mentor_projects/base/mentoruser/' + id).pipe(
			catchError ((error) => {
				return throwError(() => new Error(error.error.message))
			})
		);
	}

	createMyProject(postvars: IstoreMyProjectsRequest): Observable<IstoreMyProjectsResponse> {
		return this.http.post<IstoreMyProjectsResponse>(environment.apiUrl + '/mentor_projects/base/mentoruser', postvars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	updateMyProject(id: string, putvars: IstoreMyProjectsRequest): Observable<IstoreMyProjectsResponse> {
		return this.http.put<IstoreMyProjectsResponse>(environment.apiUrl + '/mentor_projects/base/mentoruser/' + id, putvars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	deleteMyProject(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentor_projects/base/mentoruser/' + id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	updateMyProjectRequirements(id: string, req: string): Observable<ImentorProjectRequirements> {
		let putVars = {'requirement_text': req};
		return this.http.put<ImentorProjectRequirements>(environment.apiUrl + '/mentoruser/mentor_project_requirements/' + id, putVars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	createMyProjectRequirements(mentor_project_id: string, req: string): Observable<ImentorProjectRequirements> {
		let postVars = {'requirement_text': req};
		return this.http.post<ImentorProjectRequirements>(environment.apiUrl + '/mentoruser/mentor_project_requirements/'
			+ mentor_project_id, postVars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	deleteMyProjectRequirements(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentoruser/mentor_project_requirements/' + id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	getMentorProjectDropdowns(): Observable<MentorProjectDropdowns> {
		return this.http.get<MentorProjectDropdowns>(environment.apiUrl + '/dropdowns/mentoruser?mode=mentor_project_dropdowns').pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
}
