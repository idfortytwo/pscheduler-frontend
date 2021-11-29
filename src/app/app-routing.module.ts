import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskConfigTableComponent } from "./pages/task-config-table/task-config-table.component";
import { TaskExecutorTableComponent } from "./pages/task-executor-table/task-executor-table.component";

const routes: Routes = [
  { path: '', redirectTo: 'configs', pathMatch: 'full', },
  { path: 'configs', component: TaskConfigTableComponent },
  { path: 'executors', component: TaskExecutorTableComponent },
  { path: '**', redirectTo: 'configs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
