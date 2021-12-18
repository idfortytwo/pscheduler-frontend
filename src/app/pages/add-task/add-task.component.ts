import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Task } from "../../shared/data-models"
import {ApiService} from "../../shared/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
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

  constructor(public fb: FormBuilder,
              public api: ApiService,
              public router: Router) {
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
    this.triggerTypeControl.valueChanges
      .subscribe((triggerType: string) => {
        this.clearForm(triggerType)
      }
    )
  }

  clearForm(triggerType: string) {
    this.triggerArgsControl.setValue('')

    if (triggerType == 'interval') {
      for (let controlName in this.intervalOptions.controls) {
        this.intervalOptions.controls[controlName].setValue('')
      }
      this.triggerArgsControl.clearValidators()
    } else {
      this.triggerArgsControl.setValidators(Validators.required)
    }
  }

  getCommandErrorMessage() {
    return this.commandControl.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit() {
    if (!this.commandControl.hasError('required') && !this.triggerArgsControl.hasError('required')) {
      let task: Task = this.options.value
      if (this.triggerTypeControl.value == 'interval') {
        task.trigger_args = this.intervalOptions.value
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
