// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// angular plugins imports
import { Angular2TokenService } from "angular2-token";

// components imports
import { AppComponent } from './app.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskDetailComponent } from "./tasks/task-detail/task-detail.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectDetailComponent } from "./projects/project-detail/project-detail.component";

// services imports
import { AuthService } from "./shared/auth.service";
import { TaskService } from "./tasks/shared/task.service";
import { ProjectService } from "./projects/shared/project.service";

// guards imports
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";


// modules imports
import { AppRoutingModule } from "./app-routing.module";

// rxjs operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

// rxjs extensions
import "rxjs/add/Observable/of";
import "rxjs/add/Observable/throw";

// jquery plugins
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInFormComponent,
    SignUpFormComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    TasksComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Angular2TokenService,
    AuthGuard,
    AuthService,
    NotAuthenticatedGuard,
    TaskService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }