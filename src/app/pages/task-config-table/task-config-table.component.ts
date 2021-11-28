import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TaskConfig} from "../../shared/data-models";
import {ApiService} from "../../shared/api.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfigDialogBoxComponent} from "../../components/delete-config-dialog-box/delete-config-dialog-box.component";

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
    const dialog = this.dialog.open(DeleteConfigDialogBoxComponent, { data: row })
    dialog.afterClosed().subscribe(result => {
      if (result.event == 'Delete') {
        this.deleteRowData(result.data)
      }
    })
  }

  deleteRowData(row: TaskConfig) {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.task_config_id != row.task_config_id;
    })
    this.dataSource._updateChangeSubscription()
  }
}
