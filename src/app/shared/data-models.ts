export interface Task {
  task_id: number
  title: string
  descr: string
  command: string
  trigger_type: string
  trigger_args: string | IntervalArgs | CronArgs
}

export interface TaskExecutor {
  task: Task
  active: boolean
}

export interface IntervalArgs {
  seconds: number
  minutes: number
  hours: number
  days: number
  weeks: number
}

export interface CronArgs {
  cron: string
}

export interface ProcessLog {
  process_log_id: number
  task_id: number
  status: string
  start_date: Date
  finish_date: Date
  return_code: number
}

export interface OutputLog {
  output_log_id: number
  process_log_id: number
  message: string
  time: Date
  error: boolean
}
