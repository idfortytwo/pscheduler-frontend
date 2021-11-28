import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskConfig } from "../../shared/data-models";

@Component({
  selector: 'app-delete-config-dialog-box',
  templateUrl: './delete-config-dialog-box.component.html',
  styleUrls: ['./delete-config-dialog-box.component.css']
})
export class DeleteConfigDialogBoxComponent {
  localTaskConfig: TaskConfig;

  constructor(public dialogRef: MatDialogRef<DeleteConfigDialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public taskConfig: TaskConfig) {
      this.localTaskConfig = taskConfig;
    }

  doAction(){
    this.dialogRef.close({ event: 'Delete', data: this.localTaskConfig });
  }

  closeDialog(){
    this.dialogRef.close({ event:' Cancel' });
  }
}
