export interface Task {
  task_id: number;
  command: string;
  trigger_type: string;
  trigger_args: string | IntervalArgs;
}

export interface TaskExecutor {
  task: Task,
  active: boolean
}

export interface IntervalArgs {
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
  weeks: number
}
