export interface IgetClientAdminUserDropdown {
	sectors: IgetSectorDropdown[];
	roles: IgetRoleDropdown[];
}

export interface IgetSectorDropdown {
	'sector_name': string;
	'sector_id': string;
}

export interface IgetRoleDropdown {
	'id': string;
	'role_name': string;
	'description': string;
}
