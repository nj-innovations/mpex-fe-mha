import { Route } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { CreateUserComponent } from "./create-user/create-user.component";

export const USERS_ROUTES: Route[] = [
	{
		path: '',
		component: UsersComponent
	},
	{
		path: 'update/:id',
		component: UpdateUserComponent,
	},
	{
		path: 'create',
		component: CreateUserComponent
	}
];