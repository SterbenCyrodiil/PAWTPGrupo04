import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTecnicoComponent } from './sign-up-tecnico.component';

describe('SignUpTecnicoComponent', () => {
  let component: SignUpTecnicoComponent;
  let fixture: ComponentFixture<SignUpTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
