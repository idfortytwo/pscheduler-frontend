import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-config-dialog-box',
  templateUrl: './confirm-row-dialog-box.component.html',
  styleUrls: ['./confirm-row-dialog-box.component.css']
})
export class ConfirmRowDialogBoxComponent {
  title: string
  descr: string
  taskID: number

  constructor(public dialogRef: MatDialogRef<ConfirmRowDialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = data.title
      this.descr = data.descr
      this.taskID = data.taskID
    }

  doAction(){
    this.dialogRef.close({ event: 'Confirm', taskID: this.taskID });
  }

  closeDialog(){
    this.dialogRef.close({ event: 'Cancel' });
  }
}
