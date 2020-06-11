import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInfoEditComponent } from './request-info-edit.component';

describe('RequestInfoEditComponent', () => {
  let component: RequestInfoEditComponent;
  let fixture: ComponentFixture<RequestInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
