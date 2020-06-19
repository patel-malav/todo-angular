import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNewTaskComponent } from './todo-new-task.component';

describe('TodoNewTaskComponent', () => {
  let component: TodoNewTaskComponent;
  let fixture: ComponentFixture<TodoNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
