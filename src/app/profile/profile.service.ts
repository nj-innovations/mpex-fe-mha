import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IgetProfileResponse } from './requests/IgetProfileResponse';

@Injectable({ providedIn: 'root' })
export class ProfileService {

	constructor(private http: HttpClient) {}

	getProfile(): Observable<IgetProfileResponse>{
		return this.http.get<IgetProfileResponse>(environment.apiUrl + '/regularuser/profile').pipe(
			map((response: IgetProfileResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}
