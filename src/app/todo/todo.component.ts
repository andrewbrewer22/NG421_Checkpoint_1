import { Component, OnInit, Input } from '@angular/core';
import {TodoService} from '../services/todo.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ITodo } from '../interfaces/itodo';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;
  isEditing = false;
  constructor(private todoService: TodoService, private modalService: NgbModal) { }
  todoTitle = '';
  statuses: string[] = this.todoService.getStatuses();

  ngOnInit() {
  }

  async deleteTodo(todo) {
    let result;
    const modal = this.modalService.open(ConfirmationModalComponent);
    modal.componentInstance.modalInstance = modal;
    try {
      result = await modal.result;
      if (result === 'yes') {
        this.todoService.deleteTodo(todo);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

async editTodo(todo: ITodo) {
  const modal = this.modalService.open(TodoEditComponent);
  modal.componentInstance.modalInstance = modal;
  modal.componentInstance.todo = todo;
  try {
    const result = await modal.result;
    this.todo.description = result;
  } catch (ex) {
    console.log(ex);
  }
}

get IsTodo(): boolean {
  return this.todo !== undefined && this.todo.status === 'Todo';
}

get IsDoing() : boolean {
  return this.todo !== undefined && this.todo.status === 'Doing';
}

get IsDone() : boolean {
  return this.todo !== undefined && this.todo.status === 'Done';
}

get getTitleClass(): any {
  return {
    todo: this.IsDone,
    doing: this.IsDoing,
    done: this.IsDone
  };
}
}
