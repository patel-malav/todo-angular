import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../todos.service';

interface DialogData {
  name: string;
}

@Component({
  selector: 'app-todo-new-list',
  templateUrl: './todo-new-list.component.html',
  styleUrls: ['./todo-new-list.component.scss'],
})
export class TodoNewListComponent implements OnInit {
  newListForm: FormGroup;
  constructor(
    public newListRef: MatDialogRef<TodoNewListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    fb: FormBuilder,
    public todos: TodosService
  ) {
    this.newListForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}
  addTodo() {
    this.todos.addTodo(this.newListForm.value);
    this.newListRef.close();
  }
  cancel(): void {
    this.newListRef.close();
  }
}
