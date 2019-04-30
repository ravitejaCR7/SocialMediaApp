import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileEachPostRandomComponent } from './my-profile-each-post-random.component';

describe('MyProfileEachPostRandomComponent', () => {
  let component: MyProfileEachPostRandomComponent;
  let fixture: ComponentFixture<MyProfileEachPostRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileEachPostRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileEachPostRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
