import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoRequestsComponent } from './tecnico-requests.component';

describe('TecnicoRequestsComponent', () => {
  let component: TecnicoRequestsComponent;
  let fixture: ComponentFixture<TecnicoRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicoRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
