import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRenameComponent } from './todo-rename.component';

describe('TodoRenameComponent', () => {
  let component: TodoRenameComponent;
  let fixture: ComponentFixture<TodoRenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoRenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
