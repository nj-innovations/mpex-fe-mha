export interface IconnectionsResponse {
	'id': string;
	'status': string;
	'mentor_fname': string;
	'mentor_lname': string;
	'mentor_organization': string | null;
	'student_fname': string;
	'student_lname': string;
	'created_at': string;
}