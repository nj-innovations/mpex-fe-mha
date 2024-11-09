import { IconnectionsResponse } from "./requests/IconnectionsResponse";

export class ConnectionsModel {
	id: string;
	student: string;
	mentor: string;
	organization: string;
	status: string;
	created_at: string;

	constructor(connection: IconnectionsResponse) { 
		this.id = connection.id;
		this.student = connection.student_fname + ' ' + connection.student_lname;
		this.mentor = connection.mentor_fname + ' ' + connection.mentor_lname;
		this.organization = connection.mentor_organization ?? '';
		this.status = connection.status;
		this.created_at = connection.created_at;
	}
}