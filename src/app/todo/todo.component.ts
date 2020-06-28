import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoNewTaskComponent } from '../todo-new-task/todo-new-task.component';
import { TodosService } from '../todos.service';
import { TodoNewListComponent } from '../todo-new-list/todo-new-list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  selectedName = null;
  constructor(
    public auth: AuthService,
    public todos: TodosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.todos.selected.subscribe((list) => {
      this.selectedName = list?.name;
    });
  }

  toggleMenu() {
    this.todos.menuOpen = !this.todos.menuOpen;
  }

  newTask() {
    const newTaskRef = this.dialog.open(TodoNewTaskComponent, {
      minWidth: '20rem',
      width: '80%',
      maxWidth: '40rem',
      data: { listName: this.selectedName, time: new Date().toISOString() },
    });
    newTaskRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.todos.addTask(data);
    });
  }

  newTodo() {
    const newListRef = this.dialog.open(TodoNewListComponent, {
      minWidth: '20rem',
      width: '80%',
      maxWidth: '40rem',
      data: {
        name: this.selectedName,
      },
    });
  }
}
