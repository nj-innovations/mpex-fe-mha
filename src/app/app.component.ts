import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AlertsComponent } from './core/alerts/alerts.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { map } from 'rxjs/internal/operators/map';
import { AlertsService } from './core/alerts/alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalService } from './core/service/custom-modal-service.service';

@Component({
	standalone: true,
	imports: [RouterModule, HeaderComponent, AlertsComponent, CommonModule, SidebarComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [
		{provide: NgbModal, useClass: CustomModalService}
	]
})
export class AppComponent implements OnInit {
	title = 'MPEX';
	visibleNavBar = false;
	showHeader$ = this.router.events.pipe(
		map(() => this.route.firstChild?.snapshot.data['useAuthTemplate'] ?? true)
	  );
	
	constructor(public router: Router, public route: ActivatedRoute, public alertService: AlertsService){
		
	}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.alertService.clearAlerts();
			}
		});
	}
}