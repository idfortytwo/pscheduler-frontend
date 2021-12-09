import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTableComponent } from "./pages/task-table/task-table.component";
import { TaskExecutorTableComponent } from "./pages/task-executor-table/task-executor-table.component";
import { AddTaskComponent } from "./pages/add-task/add-task.component";
import { EditTaskComponent } from "./pages/edit-task/edit-task.component";
import { ExecutionLogComponent } from "./pages/execution-log/execution-log.component";
import { ExecutionOutputLogComponent } from "./pages/execution-output-log/execution-output-log.component";

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full', },
  { path: 'tasks', component: TaskTableComponent },
  { path: 'tasks/add', component: AddTaskComponent },
  { path: 'tasks/edit/:task_id', component: EditTaskComponent },
  { path: 'executors', component: TaskExecutorTableComponent },
  { path: 'execution', component: ExecutionLogComponent },
  { path: 'execution/output/:execution_log_id', component: ExecutionOutputLogComponent },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
