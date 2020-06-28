import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

interface DialogData {
  listName: string;
  taskName?: string;
  descp?: string;
  time?: string;
}

@Component({
  selector: 'app-todo-new-task',
  templateUrl: './todo-new-task.component.html',
  styleUrls: ['./todo-new-task.component.scss'],
})
export class TodoNewTaskComponent implements OnInit {
  descp = false;
  time = false;
  newTaskForm: FormGroup;
  @ViewChild('picker') picker: MatDatepicker<any>;
  constructor(
    public newTaskRef: MatDialogRef<TodoNewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    fb: FormBuilder
  ) {
    this.newTaskForm = fb.group({
      title: [null, Validators.required],
      descp: [null],
      time: [null],
    });
  }

  ngOnInit(): void {}
  toggleDescription() {
    this.descp = !this.descp;
  }
  toggleTime() {
    this.time = !this.time;
  }
  addTask(): void {
    this.newTaskRef.close(this.newTaskForm.value);
  }
  cancel(): void {
    this.newTaskRef.close();
  }
}
