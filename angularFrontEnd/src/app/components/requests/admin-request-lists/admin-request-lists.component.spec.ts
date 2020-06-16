import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestListsComponent } from './admin-request-lists.component';

describe('AdminRequestListsComponent', () => {
  let component: AdminRequestListsComponent;
  let fixture: ComponentFixture<AdminRequestListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRequestListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
