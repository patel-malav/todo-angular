import { Injectable } from '@angular/core';
import { ReplaySubject, of } from 'rxjs';
import { map, take, switchMap, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Todo, Task } from './interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public menuOpen = true;
  public selectedTodo: Todo = null;
  private token: HttpHeaders;
  public lists$ = new ReplaySubject<Todo[]>(1);

  constructor(private http: HttpClient, private auth: AuthService) {
    auth.user
      .pipe(
        switchMap((user) => {
          if (user.token) {
            this.token = new HttpHeaders().set(
              'Authorization',
              'Bearer ' + user.token
            );
            return http.get(environment.apiUrl + '/todos', {
              headers: this.token,
            });
          } else {
            return of(null);
          }
        })
      )
      .subscribe((todos) => {
        this.lists$.next(todos);
      });

    this.lists$.subscribe((lists) => {
      if (this.selectedTodo?.id) {
        this.selectedTodo = lists.find(
          (list) => list.id === this.selectedTodo.id
        );
      }
    });
  }

  selectTodo(id: string) {
    this.lists$.pipe(take(1)).subscribe((lists) => {
      this.selectedTodo = lists.find((list) => list.id === id);
      this.menuOpen = !this.menuOpen;
    });
  }

  addTodo({ name }: { [key: string]: any }) {
    this.http
      .post<Todo>(
        `${environment.apiUrl}/todos`,
        { name },
        { headers: this.token }
      )
      .pipe(
        mergeMap((newTodo) =>
          this.lists$.pipe(map((todos) => [...todos, newTodo]))
        ),
        take(1)
      )
      .subscribe((todos) => this.lists$.next(todos));
  }

  updateTodo(id: string, { name }: { [key: string]: any }) {
    this.http
      .put<Todo>(
        `${environment.apiUrl}/todos/${id}`,
        { name },
        { headers: this.token }
      )
      .pipe(
        mergeMap((updatedTodo) =>
          this.lists$.pipe(
            map((todos) => [
              ...todos.filter((todo) => todo.id !== id),
              updatedTodo,
            ])
          )
        ),
        take(1)
      )
      .subscribe((todos) => this.lists$.next(todos));
  }

  deleteTodo(id: string) {
    this.http
      .delete<Todo>(`${environment.apiUrl}/todos/${id}`, {
        headers: this.token,
      })
      .pipe(
        mergeMap((deletedTodo) =>
          this.lists$.pipe(
            map((todos) => [
              ...todos.filter((todo) => todo.id !== deletedTodo.id),
            ])
          )
        ),
        take(1)
      )
      .subscribe((todos) => this.lists$.next(todos));
  }

  addTask({ title, descp, time }: { [key: string]: any }) {
    if (this.selectedTodo.id) {
      this.http
        .post<Task[]>(
          `${environment.apiUrl}/todos/${this.selectedTodo.id}/tasks`,
          {
            title,
            ...(descp && { descp }),
            ...(time && { time }),
          },
          { headers: this.token }
        )
        .pipe(
          mergeMap((tasks) =>
            this.lists$.pipe(
              map((todos) => {
                const selectedTodo = todos.find(
                  (todo) => todo.id === this.selectedTodo.id
                );
                selectedTodo.tasks = [...tasks];
                return todos;
              })
            )
          ),
          take(1)
        )
        .subscribe((todos) => {
          this.lists$.next(todos);
        });
    }
  }

  updateTask(id: string, payload: { [key: string]: any }) {
    if (this.selectedTodo.id) {
      this.http
        .put<Task[]>(
          `${environment.apiUrl}/todos/${this.selectedTodo.id}/tasks/${id}`,
          payload,
          { headers: this.token }
        )
        .pipe(
          mergeMap((tasks) =>
            this.lists$.pipe(
              map((todos) => {
                const selectedTodo = todos.find(
                  (todo) => todo.id === this.selectedTodo.id
                );
                selectedTodo.tasks = [...tasks];
                return todos;
              })
            )
          ),
          take(1)
        )
        .subscribe((todos) => {
          this.lists$.next(todos);
        });
    }
  }

  deleteTask(id: string) {
    if (this.selectedTodo.id) {
      this.http
        .delete<Task[]>(
          `${environment.apiUrl}/todos/${this.selectedTodo.id}/tasks/${id}`,
          { headers: this.token }
        )
        .pipe(
          mergeMap((tasks) =>
            this.lists$.pipe(
              map((todos) => {
                const selectedTodo = todos.find(
                  (todo) => todo.id === this.selectedTodo.id
                );
                selectedTodo.tasks = [...tasks];
                return todos;
              })
            )
          ),
          take(1)
        )
        .subscribe((todos) => {
          this.lists$.next(todos);
        });
    }
  }
}
