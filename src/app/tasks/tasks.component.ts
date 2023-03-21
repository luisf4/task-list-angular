import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {


  tasks: string[] =['Make bred','Buy wine','do homework','aaaah'];

  inputValue: string='';
  

  add() {
    this.tasks.unshift(this.inputValue);
  }
  remove(index: string) {
    const item = this.tasks.indexOf(index);
    this.tasks.splice(item,1);
  }
  removeAll() {
    this.tasks = [];
  }
}
  
