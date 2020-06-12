import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoRequestListsComponent } from './tecnico-request-lists.component';

describe('TecnicoRequestListsComponent', () => {
  let component: TecnicoRequestListsComponent;
  let fixture: ComponentFixture<TecnicoRequestListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicoRequestListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoRequestListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
