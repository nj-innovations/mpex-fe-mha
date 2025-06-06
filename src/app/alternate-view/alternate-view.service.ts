import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AlternateViewService {
	// Signal to control sidebar visibility
	alternateViewFooter = signal<number>(0)
	
	// Method to explicitly set the sidebar visibility
	setFooter(i: number): void {
		this.alternateViewFooter.set(i);
	}
}