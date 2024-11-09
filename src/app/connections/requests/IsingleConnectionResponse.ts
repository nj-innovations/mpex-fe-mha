export interface IsingleConnectionResponse {
	'id': string;
	'student_id': number;
	'mentor_id': number;
	'student_comments': string;
	'dept_comments': string|null;
	'status': string;
	'status_at': string;
	'status_by': number;
	'created_at': string;
	'updated_at': string;
	'mentor_fname': string;
	'mentor_lname': string;
	'student_fname': string;
	'student_lname': string;
}