import { Route } from "@angular/router";
import { inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthGuardService } from "../core/auth-guard.service";
import { CreateMentorProjectComponent } from "./create-mentor-project/create-mentor-project.component";
import { UpdateMentorProjectComponent } from "./update-mentor-project/update-mentor-project.component";

export const MENTOR_PROJECTS_ROUTES: Route[] = [
	{
		path: '',
		component: CreateMentorProjectComponent,
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized(environment.client_admin_role_id)]
	},
	{
		path: 'create/:user_id',
		component: CreateMentorProjectComponent,
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized(environment.client_admin_role_id)]
	},
	{
		path: 'update/:id',
		component: UpdateMentorProjectComponent,
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized(environment.client_admin_role_id)]
	},
];