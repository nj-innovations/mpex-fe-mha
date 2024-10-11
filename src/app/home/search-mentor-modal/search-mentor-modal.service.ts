import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchMentorModalService {
	selectedSectors: string[] = [];

	constructor() {}

	setSelectedSectors(sectors: string[]): void {
		this.selectedSectors = sectors;
	}

	getSelectedSectors(): string[] {
		return this.selectedSectors;
	}
}