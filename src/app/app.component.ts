import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoNewTaskComponent } from './todo-new-task/todo-new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuOpen = true;
  settingOpen = false;
  listName = 'Uno';
  constructor(
    public auth: AuthService,
    public tasks: TasksService,
    private dialog: MatDialog
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSettings() {
    this.settingOpen = !this.settingOpen;
  }

  newTask() {
    const newTaskRef = this.dialog.open(TodoNewTaskComponent, {
      minWidth: '20rem',
      width: '80%',
      maxWidth: '40rem',
      data: { listName: this.listName },
    });
  }
}
