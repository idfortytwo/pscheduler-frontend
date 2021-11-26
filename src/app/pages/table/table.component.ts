import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { TaskConfig } from "../../shared/data-models";

@Component({
    selector: 'app-table',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css']
})

export class TableComponent implements OnInit {
    taskConfigs: TaskConfig[]

    constructor(public api: ApiService) { }

    ngOnInit(): void {
        this.fetchTasks()
    }

    private fetchTasks() {
        this.api.getTaskConfigs().subscribe((res: TaskConfig[]) => {
            this.taskConfigs = res
        })
    }
}
