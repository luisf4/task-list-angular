import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {


  tasks: any[] = [];
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
  
