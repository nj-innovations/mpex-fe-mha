import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './core/auth-guard.service';
import { ForbiddenComponent } from './core/forbidden/forbidden.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AltLoginComponent } from './alt-login/alt-login.component';
import { environment } from '../environments/environment';
import { ViewMentorComponent } from './view-mentor/view-mentor.component';
import { ViewMentorProjectComponent } from './view-mentor-project/view-mentor-project.component';

export const routes: Routes = [
	{path: '', component: IndexComponent, data: {useAuthTemplate: false}},
	{path: 'forbidden', component: ForbiddenComponent, data: {useAuthTemplate: false}},
	{path: 'reset-password/:token', component: ResetPasswordComponent, data: {useAuthTemplate: false}},
	{path: 'alt-login/:token', component: AltLoginComponent, data: {useAuthTemplate: false}},
	{path: 'home', component: HomeComponent, data: {useAuthTemplate: true}},
	{path: 'view-mentor/:id', component: ViewMentorComponent, data: {useAuthTemplate: true}},
	{path: 'view-mentor-project/:id', component: ViewMentorProjectComponent, data: {useAuthTemplate: true}},
	{path: 'profile', component: ProfileComponent, data: {useAuthTemplate: true}},
	{
		path: 'connections',
		loadChildren: () => import('./connections/connections.routes').then(mod => mod.CONNECTIONS_ROUTES),
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized(environment.client_admin_role_id)]
	},
	{
		path: 'users',
		loadChildren: () => import('./users/users.routes').then(mod => mod.USERS_ROUTES),
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized(environment.client_admin_role_id)]
	},
	{
		path: 'projects',
		loadChildren: () => import('./my-projects/my-projects.routes').then(mod => mod.MY_PROJECTS_ROUTES),
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized([environment.client_admin_role_id, environment.mentor_role_id])]
	},
	{
		path: 'mentor_projects',
		loadChildren: () => import('./mentor-projects/mentor-projects.routes').then(mod => mod.MENTOR_PROJECTS_ROUTES),
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized([environment.client_admin_role_id, environment.mentor_role_id])]
	}
];
