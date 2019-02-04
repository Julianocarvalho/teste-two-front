import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';
import { ProjectService } from "../projects/shared/project.service";
import { Project } from 'app/projects/shared/project.model';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
  public tasks: Array<Task>;
  public project: Project;
  public newTask: Task;
  public selectedTask: Task = { id: 0, title: '', elapsed_time: 0, project_id: 0 };
  public startedTask: number = 0;
  public startedDate: any;
  public closedDate: any;
  public now: any;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.newTask = new Task(null, '', 0);
  }

  public ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.projectService.getById(+params['id']))
      .subscribe(
        project => this.setProject(project),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }

  public createTask() {
    if (!this.newTask.title) {
      if (this.selectedTask.title) {
        this.newTask.title = this.selectedTask.title;
      }
    }
    if (this.startedTask === 0) {
      if (!this.newTask.title) {
        alert("A tarefa deve ter um título");
      } else if (this.selectedTask.title !== this.newTask.title) {
        this.newTask.project_id = this.project.id;
        console.log("antes de criar " + this.newTask.project_id)
        this.taskService.create(this.newTask)
          .subscribe(
            (task) => {
              this.selectedTask = task;
              this.selectedTask.elapsed_time = 0;
              this.startTask(task.id);
              this.tasks.unshift(task);
              this.newTask = new Task(null, '', 0);
              this.startedDate = Date.now();
              alert("Tarefa iniciada com sucesso!")

              console.log(Date())
            },
            () => alert("Ocorreu um no servidor, tente mais tarde.")
          )
      } else {
        this.selectedTask.project_id = this.project.id;
        console.log("antes de at" + this.selectedTask.title + "description"
          + this.selectedTask.description)
        this.taskService.update(this.selectedTask)
          .subscribe(
            () => alert("Tarefa iniciada com sucesso!"),
            () => alert("Ocorreu um no servidor, tente mais tarde.")
          )
        this.startedDate = Date.now();

        this.startTask(this.selectedTask.id);
      }
    } else {
      alert("Ja existe uma tarefa iniciada, finalize a tarefa de ID "
        + this.startedTask + " para continuar!")
    }
  }

  public deleteTask(task: Task) {
    if (confirm(`Deseja realmente excluir a tarefa "${task.title}"`)) {
      this.taskService.delete(task.id)
        .subscribe(
          () => this.tasks = this.tasks.filter(t => t !== task),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }


  public onSelect(task: Task): void {
    this.selectedTask = task;
  }

  public startTask(numero: number) {
    this.startedTask = numero;
  }

  public stopTask() {
    console.log("parando " + this.selectedTask)
    if (this.selectedTask.id == this.startedTask) {
      this.startedTask = 0;
      this.closedDate = Date.now();
      this.selectedTask.elapsed_time = this.selectedTask.elapsed_time + ((this.closedDate - this.startedDate) / 1000)
      this.selectedTask.project_id = this.project.id
      console.log("comecou " + this.startedDate + " terminou " + this.closedDate + " total " + this.selectedTask.elapsed_time)
      this.updateFinal();
      this.selectedTask = new Task(null, '', 0);
      alert("Tarefa parada com sucesso!")
    } else { alert("Selecione a tarefa iniciada com Id " + this.startedTask + " para parar!") }
  }

  public updateFinal() {
    console.log(this.selectedTask)
    this.taskService.update(this.selectedTask)
      .subscribe()

  }

  public setProject(project: Project): void {
    this.project = project;
    this.taskService.getAll(this.project.id)
      .subscribe(
        tasks => this.tasks = tasks.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}