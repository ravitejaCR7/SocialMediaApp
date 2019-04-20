import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendProfileRequestComponent } from './friend-profile-request.component';

describe('FriendProfileRequestComponent', () => {
  let component: FriendProfileRequestComponent;
  let fixture: ComponentFixture<FriendProfileRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendProfileRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendProfileRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
