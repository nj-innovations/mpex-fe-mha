import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class HelperService {

	constructor() {}

    ArrayToLines(obj: string[] | number[]): string {
		return obj.join('\r\n ');
	}

	ArrayToCSV(obj: string[] | number[]): string {
		return obj.join(', ');  
	}
}