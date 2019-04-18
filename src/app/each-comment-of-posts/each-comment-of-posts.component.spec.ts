import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachCommentOfPostsComponent } from './each-comment-of-posts.component';

describe('EachCommentOfPostsComponent', () => {
  let component: EachCommentOfPostsComponent;
  let fixture: ComponentFixture<EachCommentOfPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachCommentOfPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachCommentOfPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
