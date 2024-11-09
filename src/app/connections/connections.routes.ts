import { Route } from "@angular/router";
import { ConnectionsComponent } from "./connections.component";

export const CONNECTIONS_ROUTES: Route[] = [
	{
		path: '',
		component: ConnectionsComponent
	},
	/* {
		path: 'update/:id',
		component: UpdateUserComponent,
	},
	{
		path: 'create',
		component: CreateUserComponent
	} */
];