import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { TaskConfig } from "../../shared/data-models";
import { ApiService } from "../../shared/api.service";

@Component({
  selector: 'app-task-config-table',
  templateUrl: './task-config-table.component.html',
  styleUrls: ['./task-config-table.component.css']
})
export class TaskConfigTableComponent implements OnInit {
  dataSource: any
  taskConfigs: TaskConfig[] = []

  columnDefs: any[] = ['id', 'command-args', 'trigger-type', 'trigger-args', 'actions'];

  constructor(public api: ApiService) {
  }

  ngOnInit(): void {
    this.fetchTasks()
  }

  private fetchTasks() {
    this.api.getTaskConfigs().subscribe((res: TaskConfig[]) => {
      this.taskConfigs = res
      this.dataSource = new MatTableDataSource<TaskConfig>(res)
      console.log(this.dataSource)
    })
  }
}
