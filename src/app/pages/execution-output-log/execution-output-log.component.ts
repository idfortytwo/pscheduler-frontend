import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { OutputLog } from "../../shared/data-models";
import { interval, Subscription } from "rxjs";
import { ApiService } from "../../shared/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-execution-output-log',
  templateUrl: './execution-output-log.component.html',
  styleUrls: ['./execution-output-log.component.css']
})
export class ExecutionOutputLogComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<OutputLog>()
  columnDefs: any[string] = ['time', 'message']
  lastOutputLogID: number = 0
  process_log_id!: number

  executionFinished: boolean = false
  refreshSub!: Subscription
  status!: string
  returnCode!: number

  constructor(public api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.process_log_id = parseInt(<string>params.get('process_log_id'))

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
    this.api.getOutputLogs(this.process_log_id, this.lastOutputLogID).subscribe((res) => {
      for (let execution_output_log of res.output_logs) {
        this.dataSource.data.push(execution_output_log)
      }
      this.dataSource.data = [...this.dataSource.data]

      this.lastOutputLogID = res.last_output_log_id
      if (res.status != 'started' && res.status != null) {
        this.refreshSub.unsubscribe()
        this.executionFinished = true

        this.status = res.status
        this.returnCode = res.return_code
      }
    })
  }

  getFinishMessage() {
    if (this.status == 'finished') {
      if (this.returnCode) {
        return 'Successfully finished with code ' + this.returnCode
      } else {
        return 'Successfully finished'
      }
    } else {
      if (this.returnCode) {
        return 'Failed with code ' + this.returnCode
      } else {
        return 'Failed'
      }
    }
  }
}
