import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { MatDialog } from "@angular/material/dialog";
import { TaskExecutor} from "../../shared/data-models";
import { MatTableDataSource } from "@angular/material/table";
import {DeleteRowDialogBoxComponent} from "../../components/delete-row-dialog-box/delete-row-dialog-box.component";

@Component({
  selector: 'app-task-executor-table',
  templateUrl: './task-executor-table.component.html',
  styleUrls: ['./task-executor-table.component.css']
})
export class TaskExecutorTableComponent implements OnInit {
  dataSource: any
  columnDefs: any[string] = ['id', 'command-args', 'is-running', 'actions']

  constructor(public api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchExecutors()
  }

  private fetchExecutors() {
    this.api.getTaskExecutors().subscribe((res: TaskExecutor[]) => {
      this.dataSource = new MatTableDataSource<TaskExecutor>(res)
    })
  }

  runExecutor(row: TaskExecutor) {
    this.api.runExecutor(row.task_config.task_config_id).subscribe(() => {})
    this.fetchExecutors()
  }

  openStopDialog(row: TaskExecutor) {
    const title = "Stop executing task with ID " + row.task_config.task_config_id + "?"
    const descr = ""

    const dialog = this.dialog.open(DeleteRowDialogBoxComponent,
      { data: { title: title, descr: descr, taskConfigID: row.task_config.task_config_id } })

    dialog.afterClosed().subscribe(result => {
      if (result && result.event == 'Delete') {
        this.stopExecutor(result.taskConfigID)
      }
    })
  }

  stopExecutor(taskConfigID: number) {
    this.api.stopExecutor(taskConfigID).subscribe(() => {})

    this.fetchExecutors()
    this.dataSource._updateChangeSubscription()
  }
}