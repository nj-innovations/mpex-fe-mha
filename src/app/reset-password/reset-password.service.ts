import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IverifyTokenResponse } from './requests/IverifyTokenResponse';
import { IresetPasswordRequest } from './requests/IresetPasswordRequest';
import { IstringMessageResponse } from '../core/requests/IstringMessageResponse';

@Injectable({
	providedIn: 'root'
})
export class ResetPasswordService {

    constructor(private http: HttpClient) {}

	resetPassword(data: IresetPasswordRequest) : Observable<IstringMessageResponse>{
		return this.http.post<IstringMessageResponse>(environment.apiUrl + '/auth/reset-password', data)
		.pipe(map(
			(response: IstringMessageResponse) => {
				return response;
			}
		),
		catchError (
			(error) => {
				let errmsg = error.error['message'];
				if (!errmsg) {errmsg = 'Internal Server Error'; }
				return throwError(() => new Error(errmsg))
			}
		));
	}

	verifyToken(token: string) : Observable<IverifyTokenResponse>{
		return this.http.get<IverifyTokenResponse>(environment.apiUrl + '/auth/forgot-password/' + token)
		.pipe(map(
			(response: IverifyTokenResponse) => {
				return response;
			}
		),
		catchError (
			(error) => {
				let errmsg = error.error['message'];
				console.log(errmsg);
				if (!errmsg) {errmsg = 'Internal Server Error'; }
				return throwError(() => new Error(errmsg))
			}
		));
	}

	forgotPassword(email: string) : Observable<IstringMessageResponse>{
		const postVars = {'email': email};
		console.log(postVars);
		return this.http.post<IstringMessageResponse>(environment.apiUrl + '/auth/forgot-password', postVars)
		.pipe(map(
			(response: IstringMessageResponse) => {
				return response;
			}
		),
		catchError (
			(error) => {
				let errmsg = error.error['message'];
				console.log(errmsg);
				if (!errmsg) {errmsg = 'Internal Server Error'; }
				return throwError(() => new Error(errmsg))
			}
		));
	}
}
