import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTecnicoInfoComponent } from './user-tecnico-info.component';

describe('UserTecnicoInfoComponent', () => {
  let component: UserTecnicoInfoComponent;
  let fixture: ComponentFixture<UserTecnicoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTecnicoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTecnicoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
