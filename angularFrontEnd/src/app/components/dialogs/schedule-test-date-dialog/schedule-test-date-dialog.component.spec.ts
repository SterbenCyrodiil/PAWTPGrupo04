import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTestDateDialogComponent } from './schedule-test-date-dialog.component';

describe('ScheduleTestDateDialogComponent', () => {
  let component: ScheduleTestDateDialogComponent;
  let fixture: ComponentFixture<ScheduleTestDateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTestDateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTestDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
