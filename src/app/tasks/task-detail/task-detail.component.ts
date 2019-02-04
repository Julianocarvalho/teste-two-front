import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../shared/form.utils";
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styles: [".form-control-feedback{ margin-right:20px }"]
})

export class TaskDetailComponent implements OnInit {
  public form: FormGroup;
  public task: Task;
  public taskDoneOptions: Array<any>;
  public formUtils: FormUtils;


  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.taskDoneOptions = [
      { value: false, text: "Pendente" },
      { value: true, text: "Feita" }
    ];

    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      elapsed_time: [null],
      description: [null]
    })

    this.formUtils = new FormUtils(this.form);
  }


  public ngOnInit() {
    this.task = new Task(null, null, null);

    this.route.params
      .switchMap((params: Params) => this.taskService.getById(+params['id']))
      .subscribe(
        task => this.setTask(task),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }


  public setTask(task: Task): void {
    this.task = task;
    this.form.patchValue(task);

    console.log(this.task)
  }



  public goBack() {
    this.location.back();
  }


  public updateTask() {
    this.task.title = this.form.get('title').value;
    this.task.elapsed_time = this.form.get('elapsed_time').value;
    this.task.description = this.form.get('description').value;
    console.log(this.task)

    this.taskService.update(this.task)
      .subscribe(
        () => alert("Tarefa atualizada com sucesso!"),
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}