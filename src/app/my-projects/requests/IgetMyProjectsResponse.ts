export interface IgetMyProjectsResponse {
	'id': string;
	'project': string;
	'created_at': string;
    'requirements': IgetMyProjectsRequirements[];
}

export interface IgetMyProjectsRequirements {
	'requirement_id': string;
	'requirement': string;
}