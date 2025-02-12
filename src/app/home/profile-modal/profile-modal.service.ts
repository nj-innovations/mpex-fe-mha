import { Injectable } from '@angular/core';
import { Mentor } from '../../models/Mentor';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IstudentConnectionRequest } from '../requests/IstudentConnectionRequest';
import { IstudentConnectionResponse } from '../requests/IstudentConnectionResponse';
import { IgetMentorProjectsResponse } from '../requests/IgetMentorProjectsResponse';
import { MentorProject } from '../../models/MentorProject';

@Injectable({ providedIn: 'root' })
export class ProfileModalService {
	profile!: Mentor;
	mentorProjects: MentorProject[] = [];
	
	constructor(private http: HttpClient) {}

	setProfile(profile: Mentor): void {
		this.profile = profile;
	}

	getProfile(): Mentor {
		return this.profile;
	}

	setMentorProjects(mentorProjects: MentorProject[]): void {
		this.mentorProjects = mentorProjects;
	}

	fetchMentorProjects(): MentorProject[] {
		return this.mentorProjects;
	}

	submitStudentConnection(data: IstudentConnectionRequest): Observable<IstudentConnectionResponse>{
		return this.http.post<IstudentConnectionResponse>(environment.apiUrl + '/studentuser/student_connection', data).pipe(
			map((response: IstudentConnectionResponse) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}

	getMentorProjects(mentor_guid: string): Observable<IgetMentorProjectsResponse[]>{
		return this.http.get<IgetMentorProjectsResponse[]>(environment.apiUrl + '/studentuser/mentor_projects/' + mentor_guid).pipe(
			map((response: IgetMentorProjectsResponse[]) => {
				return response;
			}),
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})	
		)
	}
}