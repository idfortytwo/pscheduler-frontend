import { Component, OnInit } from '@angular/core';
import { TaskConfig } from "../../shared/task-config";
import {ApiService} from "../../shared/api.service";

@Component({
  selector: 'app-task-config',
  templateUrl: './task-config.component.html',
  styleUrls: ['./task-config.component.css']
})
export class TaskConfigComponent implements OnInit {

  taskConfigs: TaskConfig[] = []

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.fetchTasks()

    this.api.getTaskConfig(1).subscribe((res: TaskConfig) => {
      console.log(res)
    })
  }

  private fetchTasks() {
    return this.api.getTaskConfigs().subscribe((res: TaskConfig[]) => {
      this.taskConfigs = res
      console.log(this.taskConfigs);
    })
  }
}
