export interface IgetMentorProjectsResponse {
	'id': string;
	'project': string;
	'requirements': IgetMentorProjectsRequirements[];
}

export interface IgetMentorProjectsRequirements {
	'id': string;
	'requirement': string;
}
