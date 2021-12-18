import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../shared/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IntervalArgs, Task} from "../../shared/data-models";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskID!: number;

  options: FormGroup;
  commandControl = new FormControl('', [Validators.required])
  triggerTypeControl = new FormControl('interval', [Validators.required]);
  triggerArgsControl = new FormControl('')

  intervalOptions: FormGroup;
  intervalSecondsControl = new FormControl(0)
  intervalMinutesControl = new FormControl(0)
  intervalHoursControl = new FormControl(0)
  intervalDaysControl = new FormControl(0)
  intervalWeeksControl = new FormControl(0)

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
    this.options = fb.group({
      command: this.commandControl,
      trigger_type: this.triggerTypeControl,
      trigger_args: this.triggerArgsControl,
    });
    this.intervalOptions = fb.group({
      seconds: this.intervalSecondsControl,
      minutes: this.intervalMinutesControl,
      hours: this.intervalHoursControl,
      days: this.intervalDaysControl,
      weeks: this.intervalWeeksControl
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskID = parseInt(<string>params.get('task_id'))
      this.api.getTask(this.taskID).subscribe(res => {
        const task = res.task;

        this.commandControl.setValue(task.command)
        this.triggerTypeControl.setValue(task.trigger_type)

        if (task.trigger_type == 'interval') {
          const intervalArgs: IntervalArgs = <IntervalArgs>eval(<string>task.trigger_args)
          this.intervalSecondsControl.setValue(intervalArgs.seconds)
          this.intervalMinutesControl.setValue(intervalArgs.minutes)
          this.intervalHoursControl.setValue(intervalArgs.hours)
          this.intervalDaysControl.setValue(intervalArgs.days)
          this.intervalWeeksControl.setValue(intervalArgs.weeks)
        }

        this.fillValues()
      })
    })
  }

  fillValues() {
    this.triggerTypeControl.valueChanges
      .subscribe(value => {
        this.triggerArgsControl.setValue('')
        for (let controlName in this.intervalOptions.controls) {
          this.intervalOptions.controls[controlName].setValue('')
        }

        if (value == 'interval') {
          this.triggerArgsControl.clearValidators()
        } else {
          this.triggerArgsControl.setValidators(Validators.required)
        }
      }
    )
  }

  getCommandErrorMessage() {
    return this.commandControl.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit() {
    if (!this.commandControl.hasError('required') && !this.triggerArgsControl.hasError('required')) {
      let task: Task = this.options.value;
      if (this.triggerTypeControl.value == 'interval') {
        task.trigger_args = this.intervalOptions.value;

      }

      this.api.editTask(this.taskID, task).subscribe(() => {
        this.returnToTasks()
      })
    }
  }

  returnToTasks() {
    this.router.navigate(['tasks']).then()
  }
}
