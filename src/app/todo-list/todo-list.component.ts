import { Component, Input, OnInit } from '@angular/core';
import {ITodo} from '../interfaces/itodo';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  get todoList(): ITodo[] {
    return this.todoService.getTodos(this.status);
  }

  @Input()status: string;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

}
