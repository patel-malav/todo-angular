import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodosService } from '../todos.service';
import { Task } from '../interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  today: Task[] = [];
  scheduled: Task[] = [];
  remaining: Task[] = [];
  completed: Task[] = [];
  sub: Subscription;
  constructor(public todos: TodosService) {}
  ngOnInit(): void {
    this.sub = this.todos.selected.subscribe(({ tasks }) => {
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
      // console.log(this.today, this.scheduled, this.remaining, this.completed);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
