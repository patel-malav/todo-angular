import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TasksService } from '../tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoRenameComponent } from '../todo-rename/todo-rename.component';

@Component({
  selector: 'app-todo-menu',
  templateUrl: './todo-menu.component.html',
  styleUrls: ['./todo-menu.component.scss'],
})
export class TodoMenuComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public tasks: TasksService
  ) {}
  ngOnInit(): void {}

  edit(name: string) {
    const editListRef = this.dialog.open(TodoRenameComponent, {
      minWidth: '20rem',
      width: '80%',
      maxWidth: '40rem',
      data: { name },
    });
    editListRef
      .afterClosed()
      .subscribe((newName: any) => console.log(`Change ${name} to ${newName}`));
  }

  delete(id: any) {
    console.log(id);
  }
}
