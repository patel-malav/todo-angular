import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() completed = false;
  @Input() time: Date | number | string;
  constructor() {}
  ngOnInit(): void {}

  toggleComplete() {
    this.completed = !this.completed;
  }
}
