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

  // Function that see if the checkbox was changed if it was it will flip the boolean valeu of "isDone" thing 
  onCheckboxChange(task: any) {
    task.isDone = !task.isDone;
    this.updateTask(task);
  }
  
  // Get all tasks, TRY TO NOT RE USE IT 
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

  // Create a task with the valeu of the input fild given by the user
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

  // Updates the task, used on edditing the valeu of the name of the task and on checkbox check and uncheck
  updateTask(task: any) {
    this.tasksService.updateTask(task.id, task.name, task.isDone).subscribe(
      (data) => {
        task.editing = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Just delete the task by ID
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

  // Delete all tasks 
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
