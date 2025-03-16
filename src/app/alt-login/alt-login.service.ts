import { Injectable, OnInit } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IloginResponse } from '../index/requests/IloginResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AltLoginService {

	constructor(private http: HttpClient) { }

	login(client_id: string): Observable<IloginResponse>{
		return this.http.get<IloginResponse>(environment.apiUrl + '/auth/alt-login/' + client_id)
		.pipe(map((response: IloginResponse) => {
				return response;
			}),
			catchError( (error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}
