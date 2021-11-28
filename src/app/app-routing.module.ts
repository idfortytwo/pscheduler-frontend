import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskConfigTableComponent} from "./pages/task-config-table/task-config-table.component";

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full', },
  { path: 'table', component: TaskConfigTableComponent },
  { path: '**', redirectTo: 'table' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
