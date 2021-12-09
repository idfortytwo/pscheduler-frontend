import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TaskTableComponent } from './pages/task-table/task-table.component';
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { ConfirmRowDialogBoxComponent } from './components/confirm-row-dialog-box/confirm-row-dialog-box.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskExecutorTableComponent } from './pages/task-executor-table/task-executor-table.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ExecutionLogComponent } from './pages/execution-log/execution-log.component';
import { ExecutionOutputLogComponent } from './pages/execution-output-log/execution-output-log.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskTableComponent,
    ConfirmRowDialogBoxComponent,
    TaskExecutorTableComponent,
    AddTaskComponent,
    EditTaskComponent,
    ExecutionLogComponent,
    ExecutionOutputLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
