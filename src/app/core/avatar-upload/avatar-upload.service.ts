import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, catchError, throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AvatarUploadService {
	avatarLink = signal<string>('');
	
	constructor(private http: HttpClient) {}
	
	setAvatarLink(link: string): void {
		this.avatarLink.update(() => link);
	}

	getAvatarLink(): string {
		return this.avatarLink();
	}

	uploadAvatar(file: File, user_id: number, api_part: number): Observable<string> {
		let api_path = '/regularuser/profile/avatar';
		switch(api_part){
			case 1:
				api_path = '/superadminuser/users/avatar';
				break;
			case 2:
				api_path = '/clientadminuser/users/avatar';
				break;
		}
		let formParams = new FormData();
		formParams.append('avatar_image', file);
		formParams.append('user_id', user_id.toString());
		return this.http.post<string>(environment.apiUrl + api_path, formParams).pipe(
			map((response: string) => {
				return response;
			}),
			catchError((error) => {
				let msg = '';
				if(error.status == 422){
					msg = error.error.errors.avatar_image.join(", ");
				} else {
					msg = error.error.message;
				}
				return throwError(() => new Error(msg))
			})
		)
	}
}
