import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-update-test-result-dialog',
  templateUrl: './update-test-result-dialog.component.html',
  styleUrls: ['./update-test-result-dialog.component.css']
})
export class UpdateTestResultDialogComponent implements OnInit {
  form: FormGroup;

  request: any;
  first: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTestResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.request = data.request;
      this.first = data.first;
  }

  ngOnInit() {
    if (this.first) {
      this.form = this.fb.group({
        test: [''],
        secondDate: ['']
      });
    } else {
      this.form = this.fb.group({
        test: [''],
      });
    }
  }
  
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
