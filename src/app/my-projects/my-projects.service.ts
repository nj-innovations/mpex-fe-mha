import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IgetMyProjectsResponse } from './requests/IgetMyProjectsResponse';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { IstoreMyProjectsRequest } from './requests/IstoreMyProjectsRequest';
import { IstoreMyProjectsResponse } from './requests/IstoreMyProjectsResponse';
import { MentorProjectDropdowns } from '../mentor-projects/mentor-projects.service';
import { IgetResponsibilitiesResponse } from '../mentor-projects/update-mentor-project/requests/IgetResponsibilitiesResponse';
import { IgetRequirementsResponse } from '../mentor-projects/update-mentor-project/requests/IgetRequirementsResponse';

@Injectable({
	providedIn: 'root'
})
export class MyProjectsService {

	constructor(private http: HttpClient) { }

	getMentorProjectDropdowns(): Observable<MentorProjectDropdowns> {
		return this.http.get<MentorProjectDropdowns>(environment.apiUrl + '/dropdowns/mentoruser?mode=mentor_project_dropdowns').pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	getProjects(): Observable<IgetMyProjectsResponse[]> {
		return this.http.get<IgetMyProjectsResponse[]>(environment.apiUrl + '/mentor_projects/base/mentoruser').pipe(
			catchError ((error) => {
				return throwError(() => new Error(error.error.message))
			})
		);
	}

	getResponsibilities(mentor_project_id: string): Observable<IgetResponsibilitiesResponse[]>{
		return this.http.get<IgetResponsibilitiesResponse[]>(environment.apiUrl + '/mentor_projects/responsibilities/mentoruser/?mentor_project_id=' + mentor_project_id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	getRequirements(mentor_project_id: string): Observable<IgetRequirementsResponse[]>{
		return this.http.get<IgetRequirementsResponse[]>(environment.apiUrl + '/mentor_projects/requirements/mentoruser/?mentor_project_id=' + mentor_project_id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
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
}
