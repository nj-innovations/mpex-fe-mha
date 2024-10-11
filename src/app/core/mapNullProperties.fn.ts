export function mapNullProperties(data: any): any {
	return (
		JSON.parse(JSON.stringify(data), (key, value) => {
			return value === null ? '' : value;
		}	
	))
}