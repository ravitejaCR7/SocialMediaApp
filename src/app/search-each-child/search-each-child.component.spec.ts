import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEachChildComponent } from './search-each-child.component';

describe('SearchEachChildComponent', () => {
  let component: SearchEachChildComponent;
  let fixture: ComponentFixture<SearchEachChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEachChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEachChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
