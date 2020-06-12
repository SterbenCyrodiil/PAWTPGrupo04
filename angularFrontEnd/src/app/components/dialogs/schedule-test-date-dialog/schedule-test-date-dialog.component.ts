import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-schedule-test-date-dialog',
  templateUrl: './schedule-test-date-dialog.component.html',
  styleUrls: ['./schedule-test-date-dialog.component.css']
})
export class ScheduleTestDateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ScheduleTestDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      
    }

  ngOnInit() {
  }
}
