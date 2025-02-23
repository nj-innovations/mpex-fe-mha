import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forbidden',
    imports: [],
    templateUrl: './forbidden.component.html',
    styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {
	constructor (public router: Router){}
	
	backHome(): void {
		this.router.navigate(['/']);
	}
}
