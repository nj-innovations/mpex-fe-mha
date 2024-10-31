import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AvatarService {
	avatarLink = signal<string>('');
	
	constructor() {}
	
	setAvatarLink(link: string): void {
		this.avatarLink.update(() => link);
	}

	getAvatarLink(): string {
		return this.avatarLink();
	}
}