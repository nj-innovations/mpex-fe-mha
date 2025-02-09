export interface IgetClientAdminUserDropdown {
	sectors: IgetSectorDropdown[];
	roles: IgetRoleDropdown[];
}

export interface IgetSectorDropdown {
	'sector_name': string;
	'id': string;
	'client_id': string;
}

export interface IgetRoleDropdown {
	'id': string;
	'role_name': string;
	'description': string;
}
