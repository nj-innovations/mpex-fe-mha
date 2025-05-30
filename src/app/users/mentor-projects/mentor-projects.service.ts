import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { IupdateMentorProjectRequest } from './update-mentor-project-modal/request/IupdateMentorProjectRequest';
import { IupdateMentorProjectResponse } from './update-mentor-project-modal/request/IupdateMentorProjectResponse';
import { IcreateMentorProjectRequest } from './create-mentor-project-modal/request/IcreateMentorProjectRequest';
import { IcreateMentorProjectResponse } from './create-mentor-project-modal/request/IcreateMentorProjectResponse';
import { environment } from '../../../environments/environment';
import { IstringMessageResponse } from '../../core/requests/IstringMessageResponse';
import { IgetMentorProjectResponse } from './update-mentor-project/requests/IgetMentorProjectResponse';

@Injectable({
	providedIn: 'root'
})
export class MentorProjectsService {

	constructor(private http: HttpClient) { }

	getMentorProject(id: string): Observable<IgetMentorProjectResponse> {
		return this.http.get<IgetMentorProjectResponse>(environment.apiUrl + '/mentor_projects/base/' + id).pipe(
			map((response: IgetMentorProjectResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	createMentorProject(postvars: IcreateMentorProjectRequest): Observable<IcreateMentorProjectResponse> {
		return this.http.post<IcreateMentorProjectResponse>(environment.apiUrl + '/mentor_projects/base', postvars).pipe(
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

	/* getMentorProjectRequirements(id: string): Observable<IgetMentorProjectRequirementsRequest[]> {
		return this.http.get<IgetMentorProjectRequirementsRequest[]>(environment.apiUrl + '/clientadminuser/mentor_project_requirements/?mentor_project_id=' + id).pipe(
			map((response: IgetMentorProjectRequirementsRequest[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	updateMentorProjectRequirements(id: string, req: string): Observable<IMentorProjectRequirements> {
		let putVars = {'requirement_text': req};
		return this.http.put<IMentorProjectRequirements>(environment.apiUrl + '/clientadminuser/mentor_project_requirements/' + id, putVars).pipe(
			map((response: IMentorProjectRequirements) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	createMentorProjectRequirements(mentor_project_id: string, req: string): Observable<IMentorProjectRequirements> {
		let postVars = {'requirement_text': req};
		return this.http.post<IMentorProjectRequirements>(environment.apiUrl + '/clientadminuser/mentor_project_requirements/'
			+ mentor_project_id, postVars).pipe(
			map((response: IMentorProjectRequirements) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}

	deleteMentorProjectRequirements(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/clientadminuser/mentor_project_requirements/' + id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	} */

	getMentorProjectDropdowns(): Observable<MentorProjectDropdowns> {
		return this.http.get<MentorProjectDropdowns>(environment.apiUrl + '/clientadminuser/dropdowns?mode=mentor_project_dropdowns').pipe(
			map((response: MentorProjectDropdowns) => {
				return response;
			}),
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