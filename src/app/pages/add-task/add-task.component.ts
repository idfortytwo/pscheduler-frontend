import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Task } from "../../shared/data-models"
import {ApiService} from "../../shared/api.service";

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

  constructor(private fb: FormBuilder, private api: ApiService) {
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

      this.api.addTask(task).subscribe(taskID => {
        console.log(taskID)
      })
    }
  }
}
