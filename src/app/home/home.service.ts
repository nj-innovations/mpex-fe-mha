import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IgetMentorsResponse } from './requests/IgetMentorsResponse';

@Injectable({ providedIn: 'root' })
export class HomeService {

	constructor(private http: HttpClient) {}

	getMentors(): Observable<IgetMentorsResponse[]>{
		return this.http.get<IgetMentorsResponse[]>(environment.apiUrl + '/studentuser/mentors').pipe(
			map((response: IgetMentorsResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}