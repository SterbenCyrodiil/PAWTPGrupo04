import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-upload-results-file-dialog',
  templateUrl: './upload-results-file-dialog.component.html',
  styleUrls: ['./upload-results-file-dialog.component.css']
})
export class UploadResultsFileDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UploadResultsFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      
    }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      file: file
    });
    this.form.get('file').updateValueAndValidity();
  }

}
