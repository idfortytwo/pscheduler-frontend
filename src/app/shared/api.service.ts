import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ProcessLog, OutputLog, Task, TaskExecutor } from "./data-models";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<{'tasks': Task[]}> {
    return this.http.get<any>(
       this.baseUrl + '/task')
  }

  getTask(taskID: number): Observable<{'task': Task}> {
    return this.http.get<any>(
       this.baseUrl + '/task/' + taskID)
  }

  addTask(task: Task): Observable<{'task_id': number}> {
    return this.http.post<any>(
      this.baseUrl + '/task/', task)
  }

  deleteTask(taskID: number): Observable<{'task_id': number}> {
    return this.http.delete<any>(
       this.baseUrl + '/task/' + taskID)
  }

  editTask(taskID: number, task: Task): Observable<{'task_id': number}> {
    return this.http.post<any>(
      this.baseUrl + '/task/' + taskID, task)
  }

  getTaskExecutors(): Observable<{'task_executors': TaskExecutor[]}> {
    return this.http.get<any>(
       this.baseUrl + '/executor')
  }

  runExecutor(taskID: number): Observable<{'task_id': number}> {
    return this.http.post<any>(
       this.baseUrl + '/run_executor/' + taskID, {})
  }

  stopExecutor(taskID: number): Observable<{'task_id': number}> {
    return this.http.post<any>(
       this.baseUrl + '/stop_executor/' + taskID, {})
  }

  getProcessLogs(): Observable<{'process_logs': ProcessLog[]}> {
    return this.http.get<any>(
      this.baseUrl + '/process_log'
    )
  }

  getOutputLogs(outputLogID: number, lastOutputLogID: number):
      Observable<{
        'output_logs': OutputLog[],
        'last_output_log_id': number,
        'status': string,
        'return_code': number
      }> {
    let params = new HttpParams().set('last_output_log_id', lastOutputLogID)

    return this.http.get<any>(
      this.baseUrl + '/execution/output/' + outputLogID,
      { params: params }
    )
  }
}
