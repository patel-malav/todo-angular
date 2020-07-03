import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TodosService } from '../todos.service';
import { Task } from '../interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  today: Task[] = [];
  scheduled: Task[] = [];
  remaining: Task[] = [];
  completed: Task[] = [];
  change = 'heel';

  constructor(public todos: TodosService) {}

  ngOnInit(): void {
    this.todos.lists$
      .pipe(
        map((todos) =>
          todos.find((todo) => todo.id === this.todos.selectedTodo.id)
        )
      )
      .subscribe((todo) => {
        const { tasks } = todo;
        this.today = tasks.filter(
          (task) =>
            !task.completed &&
            new Date(task?.time).setHours(0, 0, 0, 0) ===
              new Date().setHours(0, 0, 0, 0)
        );
        this.scheduled = tasks.filter(
          (task) =>
            !task.completed &&
            new Date(task?.time).setHours(0, 0, 0, 0) >
              new Date().setHours(0, 0, 0, 0)
        );
        this.remaining = tasks.filter((task) => !task.completed && !task.time);
        this.completed = tasks.filter((task) => task.completed);
      });
  }
}
