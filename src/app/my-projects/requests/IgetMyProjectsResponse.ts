export interface IgetMyProjectsResponse {
	'id': string;
	'project_title': string;
	'project_description': string;
	'created_at': string;
    'requirements': IgetMyProjectsRequirements[];
}

export interface IgetMyProjectsRequirements {
	'requirement_id': string;
	'requirement': string;
}