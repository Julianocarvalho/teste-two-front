import { Component, OnInit } from "@angular/core";

import { Project } from "../projects/shared/project.model";
import { ProjectService } from "../projects/shared/project.service";

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html'
})

export class ProjectsComponent implements OnInit {
    public projects: Project[];
    public selectedProject: Project;
    public newProject: Project;

    public constructor(private projectService: ProjectService) {
        this.newProject = new Project(null, '');
    }

    public ngOnInit() {
        this.projectService.getAll()
            .subscribe(
                projects => this.projects = projects,
                error => alert("Ocorreu um no servidor, tente mais tarde.")
            )
    }

    public createProject() {
        this.newProject.name = this.newProject.name.trim();

        if (!this.newProject.name) {
            alert("O projeto deve ter um nome");
        } else {
            this.projectService.create(this.newProject)
                .subscribe(
                    (project) => {
                        this.projects.unshift(project);
                        this.newProject = new Project(null, '');
                    },
                    () => alert("Ocorreu um no servidor, tente mais tarde.")
                )
        }
    }

    public deleteProject(project: Project) {
        if (confirm(`Deseja realmente excluir o projeto "${project.name}"`)) {
            this.projectService.delete(project.id)
                .subscribe(
                    () => this.projects = this.projects.filter(t => t !== project),
                    () => alert("Ocorreu um no servidor, tente mais tarde.")
                )
        }
    }

    public onSelect(project: Project): void {
        this.selectedProject = project;
    }
}