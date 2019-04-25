import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketMessengingComponent } from './socket-messenging.component';

describe('SocketMessengingComponent', () => {
  let component: SocketMessengingComponent;
  let fixture: ComponentFixture<SocketMessengingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketMessengingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketMessengingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
