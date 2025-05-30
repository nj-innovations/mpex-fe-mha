import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IgetRequirementsResponse } from './requests/IgetRequirementsResponse';
import { IgetResponsibilitiesResponse } from './requests/IgetResponsibilitiesResponse';
import { IstringMessageResponse } from '../../../core/requests/IstringMessageResponse';

@Injectable({
	providedIn: 'root'
})
export class UpdateMentorProjectService {

	constructor(private http: HttpClient) {}

	getRequirements(mentor_project_id: string): Observable<IgetRequirementsResponse[]>{
		return this.http.get<IgetRequirementsResponse[]>(environment.apiUrl + '/mentor_projects/requirements/?mentor_project_id=' + mentor_project_id).pipe(
			map((response: IgetRequirementsResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	getResponsibilities(mentor_project_id: string): Observable<IgetResponsibilitiesResponse[]>{
		return this.http.get<IgetResponsibilitiesResponse[]>(environment.apiUrl + '/mentor_projects/responsibilities/?mentor_project_id=' + mentor_project_id).pipe(
			map((response: IgetResponsibilitiesResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	saveRequirement(mentor_project_id: string, requirement_text: string): Observable<IgetRequirementsResponse>{
		const postData = {'requirement_text': requirement_text};
		return this.http.post<IgetRequirementsResponse>(environment.apiUrl + '/mentor_projects/requirements/' + mentor_project_id, postData).pipe(
			map((response: IgetRequirementsResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	deleteRequirement(requirement_id: string): Observable<IstringMessageResponse>{
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentor_projects/requirements/' + requirement_id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	saveResponsibility(mentor_project_id: string, responsibility_text: string): Observable<IgetResponsibilitiesResponse>{
		const postData = {'responsibility_text': responsibility_text};
		return this.http.post<IgetResponsibilitiesResponse>(environment.apiUrl + '/mentor_projects/responsibilities/' + mentor_project_id, postData).pipe(
			map((response: IgetResponsibilitiesResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	deleteResponsibility(responsibility_id: string): Observable<IstringMessageResponse>{
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/mentor_projects/responsibilities/' + responsibility_id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}
