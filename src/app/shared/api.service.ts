import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ExecutionLog, ExecutionOutputLog, Task, TaskExecutor} from "./data-models";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<{'tasks': Task[]}> {
    return this.http.get<{'tasks': Task[]}>(
       this.baseUrl + '/task')
  }

  getTask(taskID: number): Observable<{'task': Task}> {
    return this.http.get<{'task': Task}>(
       this.baseUrl + '/task/' + taskID)
  }

  addTask(task: Task): Observable<{'task_id': number}> {
    return this.http.post<{'task_id': number}>(
      this.baseUrl + '/task/', task)
  }

  deleteTask(taskID: number): Observable<{'task_id': number}> {
    return this.http.delete<{'task_id': number}>(
       this.baseUrl + '/task/' + taskID)
  }

  editTask(taskID: number, task: Task): Observable<{'task_id': number}> {
    return this.http.post<{'task_id': number}>(
      this.baseUrl + '/task/' + taskID, task)
  }

  getTaskExecutors(): Observable<{'task_executors': TaskExecutor[]}> {
    return this.http.get<{'task_executors': TaskExecutor[]}>(
       this.baseUrl + '/executor')
  }

  runExecutor(taskID: number): Observable<{'task_id': number}> {
    return this.http.post<{'task_id': number}>(
       this.baseUrl + '/run_executor/' + taskID, {})
  }

  stopExecutor(taskID: number): Observable<{'task_id': number}> {
    return this.http.post<{'task_id': number}>(
       this.baseUrl + '/stop_executor/' + taskID, {})
  }

  getExecutionLogs(): Observable<{ 'execution_logs': ExecutionLog[], 'last_execution_log_id': number }> {
    return this.http.get<{ 'execution_logs': ExecutionLog[], 'last_execution_log_id': number }>(
      this.baseUrl + '/execution_log'
    )
  }

  getExecutionOutputLogs(executionLogID: number, lastExecutionOutputLogID: number): Observable<{
    'execution_output_logs': ExecutionOutputLog[], 'last_execution_output_log_id': number }> {
    let params = new HttpParams().set('last_execution_output_log_id', lastExecutionOutputLogID)

    return this.http.get<{ 'execution_output_logs': ExecutionOutputLog[], 'last_execution_output_log_id': number }>(
      this.baseUrl + '/execution/output/' + executionLogID,
      { params: params }
    )
  }
}
