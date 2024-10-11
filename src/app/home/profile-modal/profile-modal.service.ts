import { Injectable } from '@angular/core';
import { Mentor } from '../../models/Mentor';
import { IinternRequestRequest } from '../requests/IinternRequestRequest';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IinternRequestResponse } from '../requests/IinternRequestResponse';

@Injectable({ providedIn: 'root' })
export class ProfileModalService {
	profile!: Mentor;

	constructor(private http: HttpClient) {}

	setProfile(profile: Mentor): void {
		this.profile = profile;
	}

	getProfile(): Mentor {
		return this.profile;
	}

	submitInternRequest(data: IinternRequestRequest): Observable<IinternRequestResponse>{
		return this.http.post<IinternRequestResponse>(environment.apiUrl + '/regularuser/intern_request', data).pipe(
			map((response: IinternRequestResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}