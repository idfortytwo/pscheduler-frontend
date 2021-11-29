export interface Task {
  task_id: number;
  command_args: string;
  trigger_type: string;
  trigger_args: string;
}

export interface TaskExecutor {
  task: Task,
  is_running: boolean
}
