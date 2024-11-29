export interface IgetMentorsResponse {
	'id': number;
	'guid': string;
	'fname': string;
	'lname': string;
	'organization': string
	'title': string[];
	'degree': string[];
	'experiences_hosted': number,
	'past_student_project_titles': string[];
	'open_to_precepting': string;
	'open_to_mentoring': string;
	'projects_available': string;
	'contact_information': string;
	'is_preceptor': string;
	'is_mentor': string;
	'avatar': string;
	'linkedin': string;
	'state': string;
	'city': string;
	'sectors': IgetMentorsSector[];
	'selectedProfile': 'Y';
	'projects': IgetMentorProjects[];
}

export interface IgetMentorsSector {
	'sector_id': string;
	'sector_name': string;
}

export interface IgetMentorProjects {
	'mentor_project_id': number;
	'mentor_project_name': string;
}
