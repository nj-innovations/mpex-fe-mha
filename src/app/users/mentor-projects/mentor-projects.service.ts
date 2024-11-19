import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { IupdateMentorProjectRequest } from './update-mentor-project-modal/request/IupdateMentorProjectRequest';
import { IupdateMentorProjectResponse } from './update-mentor-project-modal/request/IupdateMentorProjectResponse';
import { IcreateMentorProjectRequest } from './create-mentor-project-modal/request/IcreateMentorProjectRequest';
import { IcreateMentorProjectResponse } from './create-mentor-project-modal/request/IcreateMentorProjectResponse';
import { environment } from '../../../environments/environment';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';

@Injectable({
	providedIn: 'root'
})
export class MentorProjectsService {

	constructor(private http: HttpClient) { }

	createMentorProject(postvars: IcreateMentorProjectRequest): Observable<IcreateMentorProjectResponse> {
		return this.http.post<IcreateMentorProjectResponse>(environment.apiUrl + '/clientadminuser/mentor_projects', postvars).pipe(
			map((response: IcreateMentorProjectResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	updateMentorProject(id: string, putvars: IupdateMentorProjectRequest): Observable<IupdateMentorProjectResponse> {
		return this.http.put<IupdateMentorProjectResponse>(environment.apiUrl + '/clientadminuser/mentor_projects/' + id, putvars).pipe(
			map((response: IupdateMentorProjectResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	deleteMentorProject(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/clientadminuser/mentor_projects/' + id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	getMentorProjectRequirements(id: string): Observable<IstringMessageResponse> {
		return this.http.get<IstringMessageResponse>(environment.apiUrl + '/clientadminuser/mentor_project_requirements/?mentor_project_id=' + id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
}
