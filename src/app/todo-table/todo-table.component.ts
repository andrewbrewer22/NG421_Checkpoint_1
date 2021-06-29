import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ITodo } from '../interfaces/itodo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'status', 'createdAt'];
  dataSource: MatTableDataSource<ITodo>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.todoService.getTodos());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filter: string): void {
    this.dataSource.filter = filter;
  }

}
