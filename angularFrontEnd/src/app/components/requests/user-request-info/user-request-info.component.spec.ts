import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestInfoComponent } from './user-request-info.component';

describe('UserRequestInfoComponent', () => {
  let component: UserRequestInfoComponent;
  let fixture: ComponentFixture<UserRequestInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRequestInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
