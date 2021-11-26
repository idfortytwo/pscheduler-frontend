import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainLayoutRoutes } from './main-layout.routing';

import { TableComponent }           from '../../pages/table/table.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    TableComponent,
  ]
})

export class MainLayoutModule {}
