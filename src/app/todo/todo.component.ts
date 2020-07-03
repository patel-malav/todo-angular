import { Component } from '@angular/core';
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
export class TodoComponent {
  constructor(
    public auth: AuthService,
    public todos: TodosService,
    private dialog: MatDialog
  ) {}

  toggleMenu() {
    this.todos.menuOpen = !this.todos.menuOpen;
  }

  newTodo() {
    const newListRef = this.dialog.open(TodoNewListComponent, {
      minWidth: '20rem',
      width: '80%',
      maxWidth: '40rem',
    });

    newListRef.afterClosed().subscribe((data) => {
      if (data) {
        this.todos.addTodo(data);
      }
    });
  }

  newTask() {
    if (this.todos.selectedTodo.id) {
      const newTaskRef = this.dialog.open(TodoNewTaskComponent, {
        minWidth: '20rem',
        width: '80%',
        maxWidth: '40rem',
        data: {
          listName: this.todos.selectedTodo.name,
          time: new Date().toISOString(),
        },
      });
      newTaskRef.afterClosed().subscribe((data) => {
        if (data) {
          this.todos.addTask(data);
        }
      });
    }
  }
}
