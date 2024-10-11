export interface IgetSuperAdminUserResponse {
	'id': number;
	'fname': string;
	'lname': string;
	'email': string;
	'organization': string;
	'title': string[];
	'degree': string[];
	'past_degree_programs': string[];
	'experience_hosted': number;
	'past_student_project_titles': string[];
	'projects_available': string;
	'contact_information': string;
	'is_super_admin': string;
	'linkedin': string;
	'avatar': string;
	'state': string;
	'city': string;
	'clients': SuperAdminUserClient[];
	'mentor_projects': SuperAdminUserMentorProject[];
}

export interface SuperAdminUserClient {
	'id': string;
	'user_client_link_id': string;
	'client_name': string;
	'role': string;
	'role_name': string;
	'approved_at': string;
	'approved_by': string;
	'is_preceptor': string;
	'is_mentor': string;
	'is_student': string;
	'is_alumni': string
	'open_to_precepting': string;
	'open_to_mentoring': string;
	'sectors': SuperAdminUserClientSector[];
}

export interface SuperAdminUserClientSector {
	'sector_id': string;
	'sector_name': string;
}

export interface SuperAdminUserMentorProject {
	'id': string;
	'project': string;
}