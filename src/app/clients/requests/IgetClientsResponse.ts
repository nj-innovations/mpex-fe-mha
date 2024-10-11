export interface IgetClientsResponse {
	'id': string;
	'client_name': string;
	'active_payment': string | null;
	'primary_contact_fname': string | null;
	'primary_contact_lname': string | null;
	'primary_contact_email': string | null;
	'primary_contact_phone': string | null;
	'secondary_contact_fname': string | null;
	'secondary_contact_lname': string | null;
	'secondary_contact_email': string | null;
	'secondary_contact_phone': string | null;
	'mailing_address': string | null;
	'billing_address': string | null;
	'created_at': string | null;
	'updated_at': string | null;
	'deleted_at': string | null;
	'created_by': number | null;
	'updated_by': string | null;
}
