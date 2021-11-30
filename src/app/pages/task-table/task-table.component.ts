import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Task } from "../../shared/data-models";
import { ApiService } from "../../shared/api.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmRowDialogBoxComponent } from "../../components/confirm-row-dialog-box/confirm-row-dialog-box.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-config-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
  dataSource: any;
  columnDefs: any[string] = ['id', 'command', 'trigger-type', 'trigger-args', 'actions'];

  constructor(public api: ApiService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.fetchTasks()
  }

  private fetchTasks() {
    this.api.getTasks().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Task>(res.tasks)
    })
  }

  openDeleteDialog(row: Task) {
    const title = "Delete task with ID " + row.task_id + "?"
    const descr = "This will delete the executor too"

    const dialog = this.dialog.open(ConfirmRowDialogBoxComponent,
      { data: { title: title, descr: descr, taskID: row.task_id } })

    dialog.afterClosed().subscribe(result => {
      if (result && result.event == 'Confirm') {
        this.deleteRow(result.taskID)
      }
    })
  }

  deleteRow(taskID: number) {
    this.api.deleteTask(taskID).subscribe(() => {})

    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.task_id != taskID;
    })
    this.dataSource._updateChangeSubscription()
  }

  addTask() {
    this.router.navigate(['tasks', 'add']).then()
  }
}
