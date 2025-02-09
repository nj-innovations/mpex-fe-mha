export interface IgetClientUserDropdown {
	'sectors': IgetClientUserSector[];
}

export interface IgetClientUserSector {
	'id': string;
	'sector_name': string;
	'client_id': string;
}