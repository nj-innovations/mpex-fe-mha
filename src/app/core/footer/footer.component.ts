import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { AlternateViewService } from '../../alternate-view/alternate-view.service';
import { LocalStorageService } from '../local-storage.service';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-footer',
	imports: [CommonModule],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.css'
})
export class FooterComponent {
	alternate_view = 0;
	alternate_view_name = '';

	constructor(public altViewService: AlternateViewService, public sessionsSerivce: LocalStorageService) {
		effect(() => {
			const i = this.altViewService.alternateViewFooter();
			this.updateFooter();
		});
	}

	updateFooter(){
		const role = this.sessionsSerivce.getValue('role');
		const original_role = this.sessionsSerivce.getValue('original_role');
		if(original_role == environment.client_admin_role_id){
			if(role == environment.mentor_role_id){
				this.alternate_view = 1;
				this.alternate_view_name = 'Professional';
			}
			if(role == environment.student_role_id){
				this.alternate_view = 1;
				this.alternate_view_name = 'Student';
			}
			if(role == environment.client_admin_role_id){
				this.alternate_view = 0;
				this.alternate_view_name = '';
			}
		}
	}
}