import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IstringMessageResponse } from '../../../core/requests/IstringMessageResponse';
import { SuperAdminUserClient } from '../requests/IgetSuperAdminUserResponse';
import { ISuperAdminUpdateUserClientRequest } from '../requests/ISuperAdminUpdateUserClientRequest';
import { HttpClient } from '@angular/common/http';
import { ISuperAdminCreateUserClientRequest } from '../requests/ISuperAdminCreateUserClientRequest';

@Injectable({
	providedIn: 'root'
})
export class ClientLinksServiceService {

	constructor(private http: HttpClient) {}

	createClientUserLinks(postvars: ISuperAdminCreateUserClientRequest): Observable<SuperAdminUserClient> {
		return this.http.post<SuperAdminUserClient>(environment.apiUrl + '/superadminuser/clientuserlinks/', postvars).pipe(
			map((response: SuperAdminUserClient) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
	
	updateClientUserLinks(id: string, putvars: ISuperAdminUpdateUserClientRequest): Observable<SuperAdminUserClient> {
		return this.http.put<SuperAdminUserClient>(environment.apiUrl + '/superadminuser/clientuserlinks/' + id, putvars).pipe(
			map((response: SuperAdminUserClient) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	deleteClientLink(id: string): Observable<IstringMessageResponse> {
		return this.http.delete<IstringMessageResponse>(environment.apiUrl + '/superadminuser/clientuserlinks/' + id).pipe(
			map((response: IstringMessageResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)		
	}
}
