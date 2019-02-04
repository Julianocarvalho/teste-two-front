import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../shared/form.utils";
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
    selector: 'project-detail',
    templateUrl: './project-detail.component.html',
    styles: [".form-control-feedback{ margin-right:20px }"]
})

export class ProjectDetailComponent implements OnInit {
    public form: FormGroup;
    public project: Project;
    public formUtils: FormUtils;


    public constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            elapsed_time: [null],
            description: [null]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit() {
        this.project = new Project(null, null, null);

        this.route.params
            .switchMap((params: Params) => this.projectService.getById(+params['id']))
            .subscribe(
                project => this.setProject(project),
                error => alert("Ocorreu um no servidor, tente mais tarde.")
            )
    }


    public setProject(project: Project): void {
        this.project = project;
        this.form.patchValue(project);
    }



    public goBack() {
        this.location.back();
    }


    public updateProject() {
        this.project.name = this.form.get('name').value;
        this.project.elapsed_time = this.form.get('elapsed_time').value;
        this.project.description = this.form.get('description').value;

        this.projectService.update(this.project)
            .subscribe(
                () => alert("Tarefa atualizada com sucesso!"),
                () => alert("Ocorreu um no servidor, tente mais tarde.")
            )
    }
}