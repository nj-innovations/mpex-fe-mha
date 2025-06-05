export interface IusersRequest {
	'id': number,
	'fname': string;
	'lname': string;
	'email': string;
	'organization': string;
	'title': string[];
	'degree': string[];
	'past_degree_programs': string[];
	'experiences_hosted': string[];
	'past_student_project_titles': string[];
	'projects_available': string[];
	'contact_information': string;
	'linkedin': string;
	'avatar': string;
	'state': string;
	'city': string;
	'capacity': number;
	'location': string;
	'role_id': string;
	'role_name': string;
	'is_alumni': string;
	'is_mentor': string;
	'is_preceptor': string;
	'open_to_precepting': string;
	'open_to_mentoring': string;
	'approved_at': string;
	'approved_by': string;
	'sectors': IsectorsRequest[];
	'mentor_projects': ImentorProjectRequest[];
}

export interface ImentorProjectRequest
{
	'id': string;
	'project': string;
}

export interface IsectorsRequest
{
	'sector_id': string;
	'sector_name': string;
}
