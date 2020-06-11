import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListsComponent } from './request-lists.component';

describe('RequestListsComponent', () => {
  let component: RequestListsComponent;
  let fixture: ComponentFixture<RequestListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
