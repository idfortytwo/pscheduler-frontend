import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { MatDialog } from "@angular/material/dialog";
import { TaskExecutor} from "../../shared/data-models";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmRowDialogBoxComponent } from "../../components/confirm-row-dialog-box/confirm-row-dialog-box.component";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-task-executor-table',
  templateUrl: './task-executor-table.component.html',
  styleUrls: ['./task-executor-table.component.css']
})
export class TaskExecutorTableComponent implements OnInit, OnDestroy {
  dataSource: any
  columnDefs: any[string] = ['id', 'command', 'status', 'active']
  refreshSub!: Subscription

  constructor(public api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchExecutors()

    this.refreshSub = interval(1000).subscribe(() => {
      this.fetchExecutors()
    })
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe()
  }

  private fetchExecutors() {
    this.api.getTaskExecutors().subscribe((res) => {
      this.dataSource = new MatTableDataSource<TaskExecutor>(res.task_executors)
    })
  }

  runExecutor(row: TaskExecutor) {
    this.api.runExecutor(row.task.task_id).subscribe(() => {})
    this.fetchExecutors()
  }

  openStopDialog(row: TaskExecutor) {
    const title = "Stop executing task with ID " + row.task.task_id + "?"
    const descr = ""

    const dialog = this.dialog.open(ConfirmRowDialogBoxComponent,
      { data: { title: title, descr: descr, taskID: row.task.task_id } })

    dialog.afterClosed().subscribe(result => {
      if (result && result.event == 'Confirm') {
        this.stopExecutor(result.taskID)
      }
    })
  }

  stopExecutor(taskConfigID: number) {
    this.api.stopExecutor(taskConfigID).subscribe(() => {})

    this.fetchExecutors()
    this.dataSource._updateChangeSubscription()
  }

  switchActivate(row: TaskExecutor) {
    if (row.active) {
      this.stopExecutor(row.task.task_id)
      console.log('stopping', row)
    } else {
      this.runExecutor(row)
    }
  }
}
