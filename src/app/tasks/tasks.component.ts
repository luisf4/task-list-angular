import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {


  tasks: string[] =['a','b','c','d'];

  inputValue: string='';
  

  submit() {
    this.tasks.unshift(this.inputValue);
    console.log(this.inputValue);
  }
  remove(index: number) {
    this.tasks.splice(index,1);
  }
}
