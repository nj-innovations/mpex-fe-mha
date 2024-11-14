import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IloginRequest } from './requests/IloginRequest';
import { IdropdownsResponse } from './requests/IdropdownsResponse';
import { IloginResponse } from './requests/IloginResponse';
import { LocalStorageService } from '../core/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '../core/alerts/alerts.service';
import { IdleTimerService } from '../core/idle-timer/idle-timer.service';

@Injectable({ providedIn: 'root' })
export class IndexService {

	constructor(private http: HttpClient, public sessionsSerivce: LocalStorageService,
		public router: Router, public route: ActivatedRoute, public alertsService: AlertsService,
		public idleTimerService: IdleTimerService) {}

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

	SuccessfulLogin(response: IloginResponse) {
		this.sessionsSerivce.setToken(response.token);
		this.sessionsSerivce.setValue('fname', response.fname);
		this.sessionsSerivce.setValue('lname', response.lname);
		this.sessionsSerivce.setValue('email', response.email);
		this.sessionsSerivce.setValue('role', response.role);
		this.sessionsSerivce.setValue('avatar_link', response.avatar_link);
		this.getDropdowns().subscribe({
			next: (res: IdropdownsResponse[]) => {
				this.sessionsSerivce.setValue('sectors', JSON.stringify(res));
				const idleTime: number = environment.idleTime;
				if(idleTime > 0){ 
					this.idleTimerService.startTimers();
				}
				this.router.navigate(['/', 'home']);
			},
			error: (error: string) => {
				this.alertsService.addErrorAlert(error);
			}					
		});
	}
}