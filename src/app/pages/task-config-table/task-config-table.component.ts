import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { TaskConfig } from "../../shared/data-models";
import { ApiService } from "../../shared/api.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmRowDialogBoxComponent } from "../../components/confirm-row-dialog-box/confirm-row-dialog-box.component";

@Component({
  selector: 'app-task-config-table',
  templateUrl: './task-config-table.component.html',
  styleUrls: ['./task-config-table.component.css']
})
export class TaskConfigTableComponent implements OnInit {
  dataSource: any;
  columnDefs: any[string] = ['id', 'command-args', 'trigger-type', 'trigger-args', 'actions'];

  constructor(public api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchTasks()
  }

  private fetchTasks() {
    this.api.getTaskConfigs().subscribe((res: TaskConfig[]) => {
      this.dataSource = new MatTableDataSource<TaskConfig>(res)
    })
  }

  openDeleteDialog(row: TaskConfig) {
    const title = "Delete task config with ID " + row.task_config_id + "?"
    const descr = "This will delete the executor too"

    const dialog = this.dialog.open(ConfirmRowDialogBoxComponent,
      { data: { title: title, descr: descr, taskConfigID: row.task_config_id } })

    dialog.afterClosed().subscribe(result => {
      if (result && result.event == 'Delete') {
        this.deleteRow(result.taskConfigID)
      }
    })
  }

  deleteRow(taskConfigID: number) {
    this.api.deleteTaskConfigs(taskConfigID).subscribe(() => {})

    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.task_config_id != taskConfigID;
    })
    this.dataSource._updateChangeSubscription()
  }
}
