import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { ExecutionOutputLog } from "../../shared/data-models";
import { interval, Subscription } from "rxjs";
import { ApiService } from "../../shared/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-execution-output-log',
  templateUrl: './execution-output-log.component.html',
  styleUrls: ['./execution-output-log.component.css']
})
export class ExecutionOutputLogComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ExecutionOutputLog>();
  columnDefs: any[string] = ['time', 'message'];
  refreshSub!: Subscription
  lastExecutionOutputLogID: number = 0;

  execution_log_id!: number;

  constructor(public api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.execution_log_id = parseInt(<string>params.get('execution_log_id'))

    })
    this.fetchExecutionOutputLogs()

    this.refreshSub = interval(1000).subscribe(() => {
      this.fetchExecutionOutputLogs()
    })
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe()
  }

  fetchExecutionOutputLogs() {
    this.api.getExecutionOutputLogs(this.execution_log_id, this.lastExecutionOutputLogID).subscribe((res) => {
      for (let execution_output_log of res.execution_output_logs) {
        this.dataSource.data.push(execution_output_log)
      }
      this.dataSource.data = [...this.dataSource.data]

      this.lastExecutionOutputLogID = res.last_execution_output_log_id
      if (res.status == 'finished' || res.status != null) {
        this.refreshSub.unsubscribe()
      }
    })
  }
}
