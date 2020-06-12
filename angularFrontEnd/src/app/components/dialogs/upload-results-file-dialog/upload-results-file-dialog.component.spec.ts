import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResultsFileDialogComponent } from './upload-results-file-dialog.component';

describe('UploadResultsFileDialogComponent', () => {
  let component: UploadResultsFileDialogComponent;
  let fixture: ComponentFixture<UploadResultsFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadResultsFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadResultsFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
