import { Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IgetMentorsResponse } from './requests/IgetMentorsResponse';


@Injectable({ providedIn: 'root' })
export class HomeService {
	private mentorsCache$?: Observable<IgetMentorsResponse[]>;
	
	constructor(private http: HttpClient) {}

	getMentors(): Observable<IgetMentorsResponse[]> {
		if (!this.mentorsCache$) {
			this.mentorsCache$ = this.http.get<IgetMentorsResponse[]>(environment.apiUrl + '/mentors').pipe(
				catchError((error) => {
					return throwError(() => new Error(error.error?.message || 'Mentors API error'));
				}),
				shareReplay(1)
			);
		}
		return this.mentorsCache$;
	}

	clearMentorsCache() {
		this.mentorsCache$ = undefined;
	}
	/* getMentors(): Observable<IgetMentorsResponse[]>{
		return this.http.get<IgetMentorsResponse[]>(environment.apiUrl + '/mentors').pipe(
			map((response: IgetMentorsResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	} */
}