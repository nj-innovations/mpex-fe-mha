export interface IgetProfileResponse {
	'fname': string;
	'lname': string;
	'email': string;
	'title': string[];
	'degree': string[];
	'experiences_hosted': number,
	'past_student_project_titles': string[];
	'open_to_precepting': string;
	'open_to_mentoring': string;
	'projects_available': string;
	'contact_information': string;
	'linkedin': string;
	'created_at': string;
	'updated_at': string;
	'client_id': string;
	'clients': IgetProfileClient[];
}

export interface IgetProfileSector {
	'sector_id': string;
	'sector_name': string;
}

export interface IgetProfileClient {
	'id': string;
	'client_name': string;
	'role': string;
	'role_name': string;
	'sectors': IgetProfileSector[]
}