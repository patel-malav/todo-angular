import { Component, OnInit, Input } from '@angular/core';
import { TodosService } from '../todos.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoNewTaskComponent } from '../todo-new-task/todo-new-task.component';
import { Task } from '../interfaces';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() task: Task;
  constructor(public todos: TodosService, private dialog: MatDialog) {}
  ngOnInit(): void {}

  toggleComplete() {
    this.task.completed = !this.task.completed;
    this.todos.updateTask(this.task.id, { completed: this.task.completed });
  }

  edit() {
    const newTaskRef = this.dialog.open(TodoNewTaskComponent, {
      minWidth: '20rem',
      width: '80%',
      maxWidth: '40rem',
      data: {
        taskName: this.task.title,
        descp: this.task.descp,
        time: this.task.time,
      },
    });
    newTaskRef.afterClosed().subscribe((data) => {
      this.todos.updateTask(this.task.id, data);
    });
  }
}
