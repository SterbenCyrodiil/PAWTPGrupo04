import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTecnicoInfoEditComponent } from './user-tecnico-info-edit.component';

describe('UserTecnicoInfoEditComponent', () => {
  let component: UserTecnicoInfoEditComponent;
  let fixture: ComponentFixture<UserTecnicoInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTecnicoInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTecnicoInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
