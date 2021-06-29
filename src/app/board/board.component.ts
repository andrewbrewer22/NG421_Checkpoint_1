import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  statuses: string[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.statuses = this.todoService.getStatuses();
  }

}
