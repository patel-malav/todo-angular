import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  name: string;
}

@Component({
  selector: 'app-todo-rename',
  templateUrl: './todo-rename.component.html',
  styleUrls: ['./todo-rename.component.scss'],
})
export class TodoRenameComponent implements OnInit {
  renameForm: FormGroup;
  constructor(
    public renameRef: MatDialogRef<TodoRenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.renameForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  cancel() {
    this.renameRef.close();
  }
  change() {
    this.renameRef.close(this.renameForm.value.name);
  }
}
