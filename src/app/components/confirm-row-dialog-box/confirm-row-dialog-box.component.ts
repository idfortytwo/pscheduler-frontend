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
  taskConfigID: number

  constructor(public dialogRef: MatDialogRef<ConfirmRowDialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = data.title
      this.descr = data.descr
      this.taskConfigID = data.taskConfigID
    }

  doAction(){
    this.dialogRef.close({ event: 'Delete', taskConfigID: this.taskConfigID });
  }

  closeDialog(){
    this.dialogRef.close({ event:' Cancel' });
  }
}
