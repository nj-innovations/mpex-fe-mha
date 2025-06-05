import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { IviewMentorProjectResponse } from './requests/IviewMentorProjectResponse';

@Injectable({
	providedIn: 'root'
})
export class ViewMentorProjectService {
	private allMentorProjectsCache$?: Observable<IviewMentorProjectResponse[]>;

	constructor(private http: HttpClient) { }

	getMentorProjectsByGuid(mentor_guid: string): Observable<IviewMentorProjectResponse[]> {
		return this.http.get<IviewMentorProjectResponse[]>(environment.apiUrl + '/mentor_projects/base?mentor_guid=' + mentor_guid).pipe(
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
			this.allMentorProjectsCache$ = this.http.get<IviewMentorProjectResponse[]>(environment.apiUrl + '/mentor_projects/base').pipe(
				catchError((error) => {
					return throwError(() => new Error(error.error?.message || 'Mentor Projects API error'));
				}),
				shareReplay(1)
			);
		}
		return this.allMentorProjectsCache$;
	}
	
	/* getAllMentorProjects(): Observable<IviewMentorProjectResponse[]> {
		return this.http.get<IviewMentorProjectResponse[]>(environment.apiUrl + '/mentor_projects/base').pipe(
			map((response: IviewMentorProjectResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	} */
}
