import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { TaskConfig } from "./task-config"

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
}
