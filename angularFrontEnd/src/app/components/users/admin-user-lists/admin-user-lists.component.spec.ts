import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserListsComponent } from './admin-user-lists.component';

describe('AdminUserListsComponent', () => {
  let component: AdminUserListsComponent;
  let fixture: ComponentFixture<AdminUserListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
