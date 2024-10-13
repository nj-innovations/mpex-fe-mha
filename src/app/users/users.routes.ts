import { Route } from "@angular/router";
import { UsersComponent } from "./users.component";
//import { CreateUserComponent } from "./SuperAdmin/create-user/create-user.component";
//import { UpdateUserComponent } from "./SuperAdmin/update-user/update-user.component";

export const USERS_ROUTES: Route[] = [
	{
		path: '',
		component: UsersComponent
	},
//	{
//		path: 'update/:id',
//		component: UpdateUserComponent,
//	},
//	{
//		path: 'create',
//		component: CreateUserComponent
//	}
];