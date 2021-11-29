import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {TaskConfig, TaskExecutor} from "./data-models";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getTaskConfigs(): Observable<TaskConfig[]> {
    return this.http.get<TaskConfig[]>(this.baseUrl + '/task_config/')
  }

  getTaskConfig(taskConfigID: number): Observable<TaskConfig> {
    return this.http.get<TaskConfig>(this.baseUrl + '/task_config/' + taskConfigID)
  }

  getTaskExecutors(): Observable<TaskExecutor[]> {
    return this.http.get<TaskExecutor[]>(this.baseUrl + '/executor/')
  }

  deleteTaskConfigs(taskConfigID: number): Observable<{'deleted': number}> {
    return this.http.delete<{'deleted': number}>(this.baseUrl + '/task_config/' + taskConfigID)
  }

  runExecutor(taskConfigID: number) {
    return this.http.post(this.baseUrl + '/run_executor/' + taskConfigID, {})
  }

  stopExecutor(taskConfigID: number) {
    return this.http.post(this.baseUrl + '/stop_executor/' + taskConfigID, {})
  }
}
