import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { interval, Subscription } from "rxjs";
import { ExecutionLog } from "../../shared/data-models";


@Component({
  selector: 'app-execution-log',
  templateUrl: './execution-log.component.html',
  styleUrls: ['./execution-log.component.css']
})
export class ExecutionLogComponent implements OnInit, AfterViewInit, OnDestroy {
  columnDefs: string[] = ['execution_log_id', 'task_id', 'status', 'start_date', 'finish_date', 'return_code']
  dataSource: MatTableDataSource<ExecutionLog> = new MatTableDataSource<ExecutionLog>()
  refreshSub!: Subscription

  @ViewChild(MatPaginator) paginator!: MatPaginator
  totalRows = 50;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.fetchExecutionLogs()

    this.refreshSub = interval(1000).subscribe(() => {
      this.fetchExecutionLogs()
    })
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe()
  }

  fetchExecutionLogs() {
    this.api.getExecutionLogs().subscribe((res) => {
      this.dataSource.data = res.execution_logs
      this.dataSource.paginator = this.paginator
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchExecutionLogs()
  }

  getMoreInfo(executionLogID: number) {
    this.router.navigate(['execution', 'output', executionLogID]).then()
  }
}
