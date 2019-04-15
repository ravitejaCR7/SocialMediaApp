import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendProfilePageComponent } from './friend-profile-page.component';

describe('FriendProfilePageComponent', () => {
  let component: FriendProfilePageComponent;
  let fixture: ComponentFixture<FriendProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
