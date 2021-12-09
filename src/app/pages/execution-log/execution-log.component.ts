import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { interval, Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { ExecutionLog } from "../../shared/data-models";
import { Router } from "@angular/router";

@Component({
  selector: 'app-execution-log',
  templateUrl: './execution-log.component.html',
  styleUrls: ['./execution-log.component.css']
})
export class ExecutionLogComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<ExecutionLog>
  columnDefs: any[string] = ['execution_log_id', 'task_id', 'status', 'start_date', 'finish_date', 'return_code',
                             'more-info']
  refreshSub!: Subscription

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchExecutionLogs()

    this.refreshSub = interval(3000).subscribe(() => {
      this.fetchExecutionLogs()
    })
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe()
  }

  fetchExecutionLogs() {
    this.api.getExecutionLogs().subscribe((res) => {
      this.dataSource = new MatTableDataSource<ExecutionLog>(res.execution_logs)
    })
  }

  getMoreInfo(executionLogID: number) {
    this.router.navigate(['execution', 'output', executionLogID]).then()
  }
}
