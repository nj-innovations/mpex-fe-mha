import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, NavbarComponent, FontAwesomeModule, NgbCollapseModule, SidebarComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent {
	faSignOut = faArrowRightFromBracket;
	faBars = faBars;
	activeSidebar = true;
	avatarImage = '';

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
