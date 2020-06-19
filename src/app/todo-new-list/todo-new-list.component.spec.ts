import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNewListComponent } from './todo-new-list.component';

describe('TodoNewListComponent', () => {
  let component: TodoNewListComponent;
  let fixture: ComponentFixture<TodoNewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoNewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoNewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
