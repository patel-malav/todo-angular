import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoRenameComponent } from '../todo-rename/todo-rename.component';
import { AuthService } from '../auth.service';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-menu',
  templateUrl: './todo-menu.component.html',
  styleUrls: ['./todo-menu.component.scss'],
})
export class TodoMenuComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public todos: TodosService
  ) {}
  ngOnInit(): void {}

  edit(id: string, name: string) {
    const editListRef = this.dialog.open(TodoRenameComponent, {
      minWidth: '20rem',
      width: '80%',
      maxWidth: '40rem',
      data: { name },
    });
    editListRef.afterClosed().subscribe((newName: string) => {
      this.todos.updateTodo(id, { name: newName });
    });
  }
}
