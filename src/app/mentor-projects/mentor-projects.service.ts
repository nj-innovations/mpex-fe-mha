import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IgetMentorProjectResponse } from './update-mentor-project/requests/IgetMentorProjectResponse';
import { IcreateMentorProjectRequest } from './requests/IcreateMentorProjectRequest';
import { IcreateMentorProjectResponse } from './requests/IcreateMentorProjectResponse';
import { IupdateMentorProjectRequest } from './requests/IupdateMentorProjectRequest';
import { IupdateMentorProjectResponse } from './requests/IupdateMentorProjectResponse';
import { environment } from '../../environments/environment';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { IgetMentorProjectByMentor } from './requests/IgetMentorProjectByMentor';

@Injectable({
	providedIn: 'root'
})
export class MentorProjectsService {

	constructor(private http: HttpClient) { }

	getMentorProject(id: string): Observable<IgetMentorProjectResponse> {
		return this.http.get<IgetMentorProjectResponse>(environment.apiUrl + '/mentor_projects/base/clientadmin/' + id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		);		
	}
	getMentorProjectByMentor(id: number): Observable<IgetMentorProjectByMentor[]> {
		return this.http.get<IgetMentorProjectByMentor[]>(environment.apiUrl + '/mentor_projects/base/clientadmin/?mentor_id=' + id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	createMentorProject(postvars: IcreateMentorProjectRequest): Observable<IcreateMentorProjectResponse> {
		return this.http.post<IcreateMentorProjectResponse>(environment.apiUrl + '/mentor_projects/base/clientadmin', postvars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	updateMentorProject(id: string, putvars: IupdateMentorProjectRequest): Observable<IupdateMentorProjectResponse> {
		return this.http.put<IupdateMentorProjectResponse>(environment.apiUrl + '/mentor_projects/base/clientadmin/' + id, putvars).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	deleteMentorProject(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentor_projects/base/clientadmin/' + id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	getMentorProjectDropdowns(): Observable<MentorProjectDropdowns> {
		return this.http.get<MentorProjectDropdowns>(environment.apiUrl + '/clientadminuser/dropdowns?mode=mentor_project_dropdowns').pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
}

export interface MentorProjectDropdowns {
	'mentor_project_dropdowns': MentorProjectDropdownsItems[];
}

export interface MentorProjectDropdownsItems {
	'id': string;
	'items': string[];
}