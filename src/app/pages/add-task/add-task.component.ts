import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Task } from "../../shared/data-models"
import { ApiService } from "../../shared/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  options: FormGroup;
  commandControl = new FormControl('', [Validators.required])
  triggerTypeControl = new FormControl('interval');

  intervalOptions: FormGroup;
  intervalSecondsControl = new FormControl(undefined)
  intervalMinutesControl = new FormControl(undefined)
  intervalHoursControl = new FormControl(undefined)
  intervalDaysControl = new FormControl(undefined)
  intervalWeeksControl = new FormControl(undefined)

  cronOptions: FormGroup
  cronControl = new FormControl('* * * * *', [Validators.required])

  dateOptions: FormGroup
  dateControl = new FormControl('', [Validators.required])

  constructor(public fb: FormBuilder,
              public api: ApiService,
              public router: Router) {
    this.options = fb.group({
      command: this.commandControl,
      trigger_type: this.triggerTypeControl
    });
    this.intervalOptions = fb.group({
      seconds: this.intervalSecondsControl,
      minutes: this.intervalMinutesControl,
      hours: this.intervalHoursControl,
      days: this.intervalDaysControl,
      weeks: this.intervalWeeksControl
    })
    this.cronOptions = fb.group({
      cron: this.cronControl
    })
    this.dateOptions = fb.group({
      date: this.dateControl
    })
  }

  ngOnInit(): void { }

  getCommandErrorMessage() {
    return this.commandControl.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit() {
    if (!this.commandControl.hasError('required')) {
      let task: Task = this.options.value

      switch (this.triggerTypeControl.value) {
        case 'interval': {
          task.trigger_args = this.intervalOptions.value
          break
        }

        case 'cron': {
          if (!this.cronControl.hasError('required'))
            task.trigger_args = this.cronControl.value
          break
        }

        case 'date': {
          if (!this.dateControl.hasError('required'))
            task.trigger_args = this.dateControl.value
          break
        }
      }

      this.submitTask(task)
    }
  }

  submitTask(task: Task) {
    this.api.addTask(task).subscribe(() => {
      this.returnToTasks()
    })
  }

  returnToTasks() {
    this.router.navigate(['tasks']).then()
  }
}
