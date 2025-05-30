import { Route } from "@angular/router";
import { MyProjectsComponent } from "./my-projects.component";
import { MyProjectsCreateComponent } from "./my-projects-create/my-projects-create.component";
import { MyProjectsUpdateComponent } from "./my-projects-update/my-projects-update.component";

export const MY_PROJECTS_ROUTES: Route[] = [
	{
		path: '',
		component: MyProjectsComponent
	},
	{
		path: 'update/:id',
		component: MyProjectsUpdateComponent
	},
	{
		path: 'create',
		component: MyProjectsCreateComponent
	}
];