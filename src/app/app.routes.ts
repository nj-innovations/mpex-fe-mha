import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ClientsComponent } from './clients/clients.component';
import { AuthGuardService } from './core/auth-guard.service';
import { inject } from '@angular/core';
import { ForbiddenComponent } from './core/forbidden/forbidden.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
	{path: '', component: IndexComponent, data: {useAuthTemplate: false}},
	{path: 'forbidden', component: ForbiddenComponent, data: {useAuthTemplate: false}},
	{path: 'reset-password/:token', component: ResetPasswordComponent, data: {useAuthTemplate: false}},
	{path: 'home', component: HomeComponent, data: {useAuthTemplate: true}},
	{path: 'profile', component: ProfileComponent, data: {useAuthTemplate: true}},
	{path: 'organizations', component: OrganizationsComponent, data: {useAuthTemplate: true}},
	{
		path: 'clients',
		component: ClientsComponent,
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized('b525006b-3d8b-4610-94ef-aeb6d4dfed6b')]
	},
	{
		path: 'users',
		loadChildren: () => import('./users/users.routes').then(mod => mod.USERS_ROUTES),
		data: {useAuthTemplate: true},
		canMatch: [() => inject(AuthGuardService).isAuthorized('b525006b-3d8b-4610-94ef-aeb6d4dfed6b')]
	}
];
