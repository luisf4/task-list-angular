import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];

  inputValue: string = '';

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addTask() {
    if (!this.inputValue.trim()) {
      return;
    }
    this.tasksService.addTask(this.inputValue).subscribe(
      (data) => {
        this.tasks.unshift(data);
        this.inputValue = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTask(task: any) {
    this.tasksService.updateTask(task.id, task.name).subscribe(
      (data) => {
        task.editing = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTask(task: any) {
    this.tasksService.deleteTask(task.id).subscribe(
      (data) => {
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteAllTasks(){
    this.tasksService.deleteAllTasks().subscribe(
      (data) =>  {
        this.tasks = [];
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
