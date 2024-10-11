import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IgetClientsResponse } from './requests/IgetClientsResponse';

@Injectable({ providedIn: 'root' })
export class ClientsService {

	constructor(private http: HttpClient) {}

	getAllClients(): Observable<IgetClientsResponse[]>{
		return this.http.get<IgetClientsResponse[]>(environment.apiUrl + '/superadminuser/clients').pipe(
			map((response: IgetClientsResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

}