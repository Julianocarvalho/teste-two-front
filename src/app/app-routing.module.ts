import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectDetailComponent } from "./projects/project-detail/project-detail.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";

import { AuthGuard } from './guards/auth.guard';
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";

const ROUTES = RouterModule.forRoot([
  { path: 'sign-in', component: SignInFormComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'sign-up', component: SignUpFormComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id/tasks', component: TasksComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
])


@NgModule({
  imports: [ROUTES],
  exports: [RouterModule]
})

export class AppRoutingModule {

}