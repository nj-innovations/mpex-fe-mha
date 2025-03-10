import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IgetProfileResponse } from './requests/IgetProfileResponse';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';
import { IupdateProfileRequest } from './requests/IupdateProfileRequest';

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

	updateUser(putvars: IupdateProfileRequest): Observable<IstringMessageResponse> {
		return this.http.put<IstringMessageResponse>(environment.apiUrl + '/regularuser/profile', putvars).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})
		)
	}
}
