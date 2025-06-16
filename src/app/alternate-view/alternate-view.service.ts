import { Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IloginResponse } from '../index/requests/IloginResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AlternateViewService {
	// Signal to control sidebar visibility
	alternateViewFooter = signal<number>(0)

	constructor(private http: HttpClient) {}	

	// Method to explicitly set the sidebar visibility
	setFooter(i: number): void {
		this.alternateViewFooter.set(i);
	}

	AuthChangeRole(new_role_id: string): Observable<IloginResponse>{
		return this.http.get<IloginResponse>(`${environment.apiUrl}/auth_change_role/${new_role_id}`).pipe(
			catchError( (error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}