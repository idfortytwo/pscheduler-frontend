import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskConfig } from "../../shared/data-models";

@Component({
  selector: 'app-delete-config-dialog-box',
  templateUrl: './delete-config-dialog-box.component.html',
  styleUrls: ['./delete-config-dialog-box.component.css']
})
export class DeleteConfigDialogBoxComponent {
  localData: any;

  constructor(public dialogRef: MatDialogRef<DeleteConfigDialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: TaskConfig) {
      this.localData = {...data};
    }

  doAction(){
    this.dialogRef.close({ event: 'Delete', data: this.localData });
  }

  closeDialog(){
    this.dialogRef.close({ event:' Cancel' });
  }
}
