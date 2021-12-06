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

export interface ExecutionLog {
  execution_log_id: number,
  task_id: number,
  status: string
  start_date: Date,
  finish_date: Date,
  return_code: number
}
