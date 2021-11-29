export interface TaskConfig {
  task_config_id: number;
  command_args: string;
  trigger_type: string;
  trigger_args: string;
}

export interface TaskExecutor {
  task_config: TaskConfig,
  is_running: boolean
}
