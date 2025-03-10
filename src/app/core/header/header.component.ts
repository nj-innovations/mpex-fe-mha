import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { IdleTimerComponent } from '../idle-timer/idle-timer.component';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-header',
    imports: [CommonModule, NavbarComponent, FontAwesomeModule, NgbCollapseModule, IdleTimerComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
	faSignOut = faArrowRightFromBracket;
	faBars = faBars;
	activeSidebar = true;
	avatarImage = '';
	logo = environment.logo;

	constructor(private renderer: Renderer2) {}

	toggleSideBar(){
		this.activeSidebar = !this.activeSidebar;
		if(this.activeSidebar){
			this.renderer.removeClass(document.body, 'toggle-sidebar');
		} else {
			this.renderer.addClass(document.body, 'toggle-sidebar');
		}
	}
}
