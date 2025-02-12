export interface IgetClientUserDropdown {
	'sectors': IgetClientUserSector[];
	'student_connection_status': IgetStudentConnectionStatus[];
}

export interface IgetClientUserSector {
	'id': string;
	'sector_name': string;
	'client_id': string;
}

export interface IgetStudentConnectionStatus{
	'connection_status': string;
}