import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { IviewMentorProjectResponse } from './requests/IviewMentorProjectResponse';
import { IgetResponsibilitiesResponse } from '../mentor-projects/update-mentor-project/requests/IgetResponsibilitiesResponse';
import { IgetRequirementsResponse } from '../mentor-projects/update-mentor-project/requests/IgetRequirementsResponse';

@Injectable({
	providedIn: 'root'
})
export class ViewMentorProjectService {
	private allMentorProjectsCache$?: Observable<IviewMentorProjectResponse[]>;

	constructor(private http: HttpClient) { }

	getMentorProjectsByGuid(mentor_guid: string): Observable<IviewMentorProjectResponse[]> {
		return this.http.get<IviewMentorProjectResponse[]>(environment.apiUrl + '/mentor_projects/base/studentuser?mentor_guid=' + mentor_guid).pipe(
			map((response: IviewMentorProjectResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
   
	getAllMentorProjects(): Observable<IviewMentorProjectResponse[]> {
		if (!this.allMentorProjectsCache$) {
			this.allMentorProjectsCache$ = this.http.get<IviewMentorProjectResponse[]>(environment.apiUrl + '/mentor_projects/base/studentuser').pipe(
				catchError((error) => {
					return throwError(() => new Error(error.error?.message || 'Mentor Projects API error'));
				}),
				shareReplay(1)
			);
		}
		return this.allMentorProjectsCache$;
	}
	
	getMentorProject(guid: string): Observable<IviewMentorProjectResponse> {
		return this.http.get<IviewMentorProjectResponse>(environment.apiUrl + '/mentor_projects/base/studentuser/' + guid).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
	
	getRequirements(mentor_project_id: string): Observable<IgetRequirementsResponse[]>{
		return this.http.get<IgetRequirementsResponse[]>(environment.apiUrl + '/mentor_projects/requirements/studentuser/?mentor_project_id=' + mentor_project_id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	getResponsibilities(mentor_project_id: string): Observable<IgetResponsibilitiesResponse[]>{
		return this.http.get<IgetResponsibilitiesResponse[]>(environment.apiUrl + '/mentor_projects/responsibilities/studentuser/?mentor_project_id=' + mentor_project_id).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}
