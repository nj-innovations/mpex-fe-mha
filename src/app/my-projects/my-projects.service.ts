import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IgetMyProjectsResponse } from './requests/IgetMyProjectsResponse';

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
}
