export interface IviewMentorResponse {
	'guid': string;
	'fname': string;
	'lname': string;
	'organization': string
	'title': string[];
	'degree': string[];
	'experiences_hosted': number,
	'open_to_precepting': string;
	'avatar': string;
	'linkedin': string;
	'state': string;
	'city': string;
	'sectors': IviewMentorsSector[];
}

export interface IviewMentorsSector {
	'sector_id': string;
	'sector_name': string;
}
