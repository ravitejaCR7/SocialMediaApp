import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileEachPostComponent } from './my-profile-each-post.component';

describe('MyProfileEachPostComponent', () => {
  let component: MyProfileEachPostComponent;
  let fixture: ComponentFixture<MyProfileEachPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileEachPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileEachPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
