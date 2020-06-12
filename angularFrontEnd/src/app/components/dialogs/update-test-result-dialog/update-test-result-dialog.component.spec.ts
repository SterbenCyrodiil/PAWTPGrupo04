import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestResultDialogComponent } from './update-test-result-dialog.component';

describe('UpdateTestResultDialogComponent', () => {
  let component: UpdateTestResultDialogComponent;
  let fixture: ComponentFixture<UpdateTestResultDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTestResultDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTestResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
