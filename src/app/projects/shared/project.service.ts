import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Angular2TokenService } from "angular2-token";
import { Project } from "./project.model";


@Injectable()

export class ProjectService {
    public projectsUrl = "projects";

    public constructor(private tokenHttp: Angular2TokenService) { }


    public getAll(): Observable<Project[]> {
        let url = this.projectsUrl;

        return this.tokenHttp.get(url)
            .catch(this.handleErrors)
            .map((response: Response) => this.responseToProjects(response));
    }

    public getById(id: number): Observable<Project> {
        let url = `${this.projectsUrl}/${id}`;

        return this.tokenHttp.get(url)
            .catch(this.handleErrors)
            .map((response: Response) => this.responseToProject(response));
    }


    public create(project: Project): Observable<Project> {
        let url = this.projectsUrl;
        let body = JSON.stringify(project);

        return this.tokenHttp.post(url, body)
            .catch(this.handleErrors)
            .map((response: Response) => this.responseToProject(response));
    }


    public update(project: Project): Observable<Project> {
        let url = `${this.projectsUrl}/${project.id}`;
        let body = JSON.stringify(project);

        return this.tokenHttp.put(url, body)
            .catch(this.handleErrors)
            .map(() => project)
    }


    public delete(id: number): Observable<null> {
        let url = `${this.projectsUrl}/${id}`;

        return this.tokenHttp.delete(url)
            .catch(this.handleErrors)
            .map(() => null)
    }


    private handleErrors(error: Response) {
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
        return Observable.throw(error);
    }


    private responseToProjects(response: Response): Project[] {
        let collection = response.json().data as Array<any>;
        let projects: Project[] = [];

        collection.forEach(item => {
            let project = new Project(
                item.id,
                item.attributes.name,
                item.attributes.description,
                item.attributes['elapsed-time'],
            )

            projects.push(project)
        })

        return projects;
    }


    private responseToProject(response: Response): Project {
        return new Project(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes.description,
            response.json().data.attributes['elapsed-time'],
        )
    }
}