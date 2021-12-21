import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { IntervalArgs, Task } from "../../shared/data-models";
import { AddTaskComponent } from "../add-task/add-task.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService} from "../../shared/api.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent extends AddTaskComponent implements OnInit {
  taskID!: number;

  constructor(public override fb: FormBuilder,
              public override api: ApiService,
              public override router: Router,
              private route: ActivatedRoute) {
    super(fb, api, router)
  }

  override ngOnInit(): void {
    super.ngOnInit()

    this.loadTaskID()
    this.loadForm()
  }

  loadTaskID() {
    this.route.paramMap.subscribe(params => {
      this.taskID = parseInt(<string>params.get('task_id'))
    })
  }

  loadForm() {
    this.api.getTask(this.taskID).subscribe(res => {
      const task = res.task;

      this.commandControl.setValue(task.command)
      this.triggerTypeControl.setValue(task.trigger_type)

      this.fillTriggerArgs(task)
    })
  }

  fillTriggerArgs(task: Task) {
    switch (task.trigger_type) {
      case 'interval': {
        this.fillInterval(task)
        break
      }

      case 'cron': {
        this.fillCron(task)
        break
      }

      case 'date': {
        this.fillDate(task)
        break
      }
    }
  }

  fillInterval(task: Task) {
    const intervalArgs: IntervalArgs = <IntervalArgs>eval(<string>task.trigger_args)
    this.intervalSecondsControl.setValue(intervalArgs.seconds)
    this.intervalMinutesControl.setValue(intervalArgs.minutes)
    this.intervalHoursControl.setValue(intervalArgs.hours)
    this.intervalDaysControl.setValue(intervalArgs.days)
    this.intervalWeeksControl.setValue(intervalArgs.weeks)
  }

  fillCron(task: Task) {
    this.cronControl.setValue(task.trigger_args)
  }

  fillDate(task: Task) {
    this.dateControl.setValue(task.trigger_args)
  }

  override submitTask(task: Task) {
    this.api.editTask(this.taskID, task).subscribe(() => {
      this.returnToTasks()
    })
  }
}
