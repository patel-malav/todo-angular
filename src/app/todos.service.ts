import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Todo, Task } from './interfaces';

const fakeTodo01: Todo = {
  id: 'fake01',
  name: 'my tasks',
  createdAt: new Date().toISOString(),
  tasks: [],
};

const fakeTodo02: Todo = {
  id: 'fake02',
  name: 'fuck list',
  createdAt: new Date().toISOString(),
  tasks: [
    {
      id: 'task01',
      title: 'parinda',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task02',
      title: 'dhruvi',
      completed: false,
      time: new Date(new Date().setHours(48, 0, 0, 0)).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task03',
      title: 'dhwani',
      completed: false,
      time: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task04',
      title: 'harsha',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public menuOpen = false;
  private lists: Todo[] = [];
  public lists$ = new ReplaySubject<Todo[]>(1);

  constructor(private auth: AuthService) {
    this.lists.push(fakeTodo01);
    this.lists.push(fakeTodo02);
    this.lists$.next(this.lists);
    this.selectTodo(fakeTodo02.id);
  }

  get selected() {
    return this.lists$.pipe(
      map((todos) => todos.filter((todo) => todo.selected)[0])
    );
  }

  addTodo({ name }: { [key: string]: any }) {
    const todo = {
      id: 'fake03',
      name,
      createdAt: new Date().toISOString(),
      tasks: [],
    };
    this.lists.push(todo);
    this.lists$.next(this.lists);
  }

  selectTodo(id: string) {
    this.lists.forEach((list) =>
      list.id === id ? (list.selected = true) : (list.selected = false)
    );
    this.lists$.next(this.lists);
    this.menuOpen = !this.menuOpen;
  }

  updateTodo(id: string, { name }: { [key: string]: any }) {
    const selectedTodo = this.lists.find((todo) => todo.id === id);
    Object.assign(selectedTodo, name && { name });
    this.lists$.next(this.lists);
  }

  deleteTodo(id: string) {
    const idx = this.lists.findIndex((todo) => todo.id === id);
    if (idx > -1) {
      this.lists.splice(idx, 1);
    }
    this.lists$.next(this.lists);
  }

  addTask({ title, descp, time }: { [key: string]: any }) {
    const task = {
      id: 'task04',
      title,
      ...(descp && { descp }),
      ...(time && { time }),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.selected.pipe(take(1)).subscribe((todo) => {
      todo.tasks.push(task);
      this.lists$.next(this.lists);
    });
  }

  updateTask(
    id: string,
    { title, descp, time, completed }: { [key: string]: any }
  ) {
    this.selected.pipe(take(1)).subscribe((todo) => {
      const selectedTask = todo.tasks.find((task) => task.id === id);
      Object.assign(selectedTask, title && { title });
      Object.assign(
        selectedTask,
        (completed !== undefined || completed !== null) && { completed }
      );
      Object.assign(selectedTask, time && { time });
      Object.assign(selectedTask, descp && { descp });
      selectedTask.updatedAt = new Date().toISOString();
      this.lists$.next(this.lists);
    });
  }

  deleteTask(id: string) {
    this.selected.pipe(take(1)).subscribe((todo) => {
      const idx = todo.tasks.findIndex((task) => task.id === id);
      if (idx > -1) {
        todo.tasks.splice(idx, 1);
      }
      this.lists$.next(this.lists);
    });
  }
}
