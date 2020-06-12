import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from "@angular/material"
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from "../../../services/requests.service"
import { UpdateRequestsService } from "../../../services/update-requests.service"
import { SessionService } from "../../../services/session.service"

import { ScheduleTestDateDialogComponent } from "../../dialogs/schedule-test-date-dialog/schedule-test-date-dialog.component"
import { UpdateTestResultDialogComponent } from "../../dialogs/update-test-result-dialog/update-test-result-dialog.component"
import { UploadResultsFileDialogComponent } from "../../dialogs/upload-results-file-dialog/upload-results-file-dialog.component"
import { Request } from '../../../models/request';

@Component({
  selector: 'app-request-info-edit',
  templateUrl: './request-info-edit.component.html',
  styleUrls: ['./request-info-edit.component.css']
})
export class RequestInfoEditComponent implements OnInit {
  requestInfo: Request;
  routeRequest: String;
  sessionUser: any;

  isTestResult: boolean;
  isTestDate: boolean;

  errors: String;

  constructor(public requestsService: RequestsService, public sessionService: SessionService,
    public updateRequestsService: UpdateRequestsService, public router: Router,  
    private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.routeRequest = this.route.snapshot.params['reqId'] || null;

    this.sessionUser = this.sessionService.sessionUserValue;

    this.requestsService.getRequest(this.routeRequest).subscribe(
      (request: any) => {
        this.requestInfo = request;
        this.checkUpdateTestResults();
      },
      (error) => {
        this.errors = error.error.message
          ? `${ error.status }: ${ error.error.message }`
          : `${ error.status }: ${ error.error }`
      }
    );
  }

  checkUpdateTestResults() {
    const reqInfo = this.requestInfo;
    if (reqInfo.casoFechado) {
      this.isTestResult = false;
      this.isTestDate = false;
    } 
    else if (!reqInfo.resultadoInicial && reqInfo.dataInicial) {
      this.isTestResult = true;
      this.isTestDate = false;
    }
    else if (!reqInfo.resultadoFinal && reqInfo.dataFinal) {
      this.isTestResult = true;
      this.isTestDate = false;
    } else {
      this.isTestResult = false;
      this.isTestDate = true;
    }
  }

  openUpdateTestResultDialog(result: boolean, first: boolean,  secondDate?: Date) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      first: first,
      request: this.requestInfo
    }
    const dialogRef = this.dialog.open(UpdateTestResultDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( result => {
      // result.test, result.secondDate
      console.log(result);

      // if (first) {
      //   this.updateRequestsService.updateFirstTestResult(this.requestInfo._id, result, secondDate).subscribe(
      //     (response) => {
      //       console.log(response.msg)
      //       this.requestInfo = response.new;
      //     },
      //     (error) => {
      //       this.errors = error.error.message
      //         ? `${ error.status }: ${ error.error.message }`
      //         : `${ error.status }: ${ error.error }`
      //     }
      //   );
      // } else {
      //   this.updateRequestsService.updateSecondTestResult(this.requestInfo._id, result).subscribe(
      //     (response) => {
      //       console.log(response.msg)
      //       this.requestInfo = response.new;
      //     },
      //     (error) => {
      //       this.errors = error.error.message
      //         ? `${ error.status }: ${ error.error.message }`
      //         : `${ error.status }: ${ error.error }`
      //     }
      //   );
      // }
    })
  }

  openScheduleTestDateDialog(date: Date, first: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      first: first,
      request: this.requestInfo
    }
    const dialogRef = this.dialog.open(ScheduleTestDateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( result => {
      // result.test, result.secondDate
      console.log(result);

      // if (first) {
      //   this.updateRequestsService.updateFirstTestDate(this.requestInfo._id, date).subscribe(
      //     (response) => {
      //       console.log(response.msg)
      //       this.requestInfo = response.new;
      //     },
      //     (error) => {
      //       this.errors = error.error.message
      //         ? `${ error.status }: ${ error.error.message }`
      //         : `${ error.status }: ${ error.error }`
      //     }
      //   );
      // } else {
      //   this.updateRequestsService.updateSecondTestDate(this.requestInfo._id, date).subscribe(
      //     (response) => {
      //       console.log(response.msg)
      //       this.requestInfo = response.new;
      //     },
      //     (error) => {
      //       this.errors = error.error.message
      //         ? `${ error.status }: ${ error.error.message }`
      //         : `${ error.status }: ${ error.error }`
      //     }
      //   );
      // }
    })
  }

  openUploadResultsFileDialog(result: boolean, first: boolean,  secondDate?: Date) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      first: first,
      request: this.requestInfo
    }
    const dialogRef = this.dialog.open(UploadResultsFileDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( result => {
      // result.test, result.secondDate
      console.log(result);

      // if (first) {
      //   this.updateRequestsService.updateFirstTestResult(this.requestInfo._id, result, secondDate).subscribe(
      //     (response) => {
      //       console.log(response.msg)
      //       this.requestInfo = response.new;
      //     },
      //     (error) => {
      //       this.errors = error.error.message
      //         ? `${ error.status }: ${ error.error.message }`
      //         : `${ error.status }: ${ error.error }`
      //     }
      //   );
      // } else {
      //   this.updateRequestsService.updateSecondTestResult(this.requestInfo._id, result).subscribe(
      //     (response) => {
      //       console.log(response.msg)
      //       this.requestInfo = response.new;
      //     },
      //     (error) => {
      //       this.errors = error.error.message
      //         ? `${ error.status }: ${ error.error.message }`
      //         : `${ error.status }: ${ error.error }`
      //     }
      //   );
      // }
    })
  }

}
