import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEachChildComponent } from './message-each-child.component';

describe('MessageEachChildComponent', () => {
  let component: MessageEachChildComponent;
  let fixture: ComponentFixture<MessageEachChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageEachChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEachChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
