import { Injectable } from '@angular/core';
import { Mentor } from '../../models/Mentor';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IstudentConnectionRequest } from '../requests/IstudentConnectionRequest';
import { IstudentConnectionResponse } from '../requests/IstudentConnectionResponse';

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

	submitStudentConnection(data: IstudentConnectionRequest): Observable<IstudentConnectionResponse>{
		return this.http.post<IstudentConnectionResponse>(environment.apiUrl + '/regularuser/student_connection', data).pipe(
			map((response: IstudentConnectionResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}