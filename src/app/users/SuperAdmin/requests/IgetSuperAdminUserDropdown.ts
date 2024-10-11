export interface IgetSuperAdminUserDropdown {
	'clients': SuperAdminUserDropdownClient[];
	'roles': SuperAdminUserDropdownRole[];
}

export interface SuperAdminUserDropdownClient {
	'id': string;
	'name': string;
	'sectors': SuperAdminUserDropdownSector[];
}

export interface SuperAdminUserDropdownSector {
	'id': string;
	'name': string;
}

export interface SuperAdminUserDropdownRole {
	'id': string;
	'role_name': string;
	'description': string;
}