export class alertModel{
	'alert_type': string;
	'prefix_message': string;
	'message': string;

	constructor(alert_type: string, prefix_message: string, message: string){
		this.alert_type = alert_type;
		this.prefix_message = prefix_message;
		this.message = message;
	}
}