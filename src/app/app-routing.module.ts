import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTableComponent } from "./pages/task-table/task-table.component";
import { TaskExecutorTableComponent } from "./pages/task-executor-table/task-executor-table.component";
import { AddTaskComponent } from "./pages/add-task/add-task.component";

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full', },
  { path: 'tasks', component: TaskTableComponent },
  { path: 'tasks/add', component: AddTaskComponent },
  { path: 'executors', component: TaskExecutorTableComponent },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
