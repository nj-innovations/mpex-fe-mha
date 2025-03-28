import { Injectable } from '@angular/core';
import { Sector } from '../models/Sector';
import { IgetStudentConnectionStatus } from '../index/requests/IgetClientUserDropdown';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	constructor(private http: HttpClient) { }

	setValue(key: string, val: string): boolean {
		try {
			localStorage.setItem(key, val);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	getValue(key: string): string | null {
		return localStorage.getItem(key);
	}

	removeValue(key: string): void {
		localStorage.removeItem(key);
	}

	clear(): void {
		localStorage.clear();
	}

	setPermissions(permissions: number[]): boolean {
		return this.setValue('permissions', JSON.stringify(permissions));
	}

	getPermissions() : number[] | null {
		let temp: string;
		let permissions: number[] = [];
		try {
			temp = localStorage.getItem('permissions') ?? '';
			if(temp !== ''){ 
				permissions = JSON.parse(temp);
			} else {
				return null;
			}
		} catch (err) {
			return null;
		}
		return permissions;
	}

	getMasquerade(): string {
		let masquerade: string
		try {
			masquerade = localStorage.getItem('masquerade') ?? '';
			if (!masquerade) {
				masquerade = '';
			}
			return masquerade;
		} catch (err) {
			return '';
		}
	}

	setToken(token: string): boolean {
		return this.setValue('api_token', token);
	}

	getToken(): string {
		let token: string;
		try {
			token = localStorage.getItem('api_token') ?? '';
			if (token != '') {
				token = token.replace(/[\n\r]+/g, '');
			}
		} catch (err) {
			return '';
		}
		return token;
	}

	getSectors(): Sector[] {
		let temp: string;
		let sectors: Sector[] = [];
		try {
			temp = localStorage.getItem('sectors') ?? '';
			if(temp !== ''){ 
				sectors = JSON.parse(temp);
			} else {
				return [];
			}
		} catch (err) {
			return [];
		}
		return sectors;
	}

	hasRole(role: string): boolean {
		let retval = false;
		const chkrole = this.getValue('role');
		if(chkrole == null){
			retval = false;
		} else {
			if(chkrole == role){
				retval = true;
			}
		}
		return retval;
	}

	getStudentConnectionStatus(): string[] {
		let temp: string;
		let scs: string[] = [];
		try {
			temp = localStorage.getItem('student_connection_status') ?? '';
			if(temp !== ''){ 
				scs = JSON.parse(temp).map((x: IgetStudentConnectionStatus) => {
					return x.connection_status;
				});
			}
		} catch (err) {

		}
		return scs;
	}

	logout(): Observable<any> {
		return this.http.get(environment.apiUrl + '/auth/logout', {})
		.pipe(map(
			(response: any) => {
				this.clear();
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