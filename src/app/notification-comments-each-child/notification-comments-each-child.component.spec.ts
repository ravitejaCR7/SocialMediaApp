import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCommentsEachChildComponent } from './notification-comments-each-child.component';

describe('NotificationCommentsEachChildComponent', () => {
  let component: NotificationCommentsEachChildComponent;
  let fixture: ComponentFixture<NotificationCommentsEachChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCommentsEachChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCommentsEachChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
