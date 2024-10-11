import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IloginRequest } from './requests/IloginRequest';
import { IdropdownsResponse } from './requests/IdropdownsResponse';
import { IloginResponse } from './requests/IloginResponse';

@Injectable({ providedIn: 'root' })
export class IndexService {

	constructor(private http: HttpClient) {}

	login(credentials: IloginRequest): Observable<IloginResponse>{
		return this.http.post<IloginResponse>(environment.apiUrl + '/auth/login/' + environment.client_id, credentials)
		.pipe(map((response: IloginResponse) => {
				return response;
			}),
			catchError( (error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	logout(): Observable<any> {
		return this.http.get(environment.apiUrl + '/auth/logout', {})
		.pipe(map(
			(response: any) => {
				return response;
			}
		)
		, catchError (
			(error) => {
				return throwError(() => new Error(error.error.message))
			}
		));
	}

	getDropdowns(): Observable<IdropdownsResponse[]> {
		return this.http.get<IdropdownsResponse[]>(environment.apiUrl + '/dropdowns')
		.pipe(map(
			(response: IdropdownsResponse[]) => {
				return response;
			}
		)
		, catchError (
			(error) => {
				return throwError(() => new Error(error.error.message))
			}
		));
	}
}