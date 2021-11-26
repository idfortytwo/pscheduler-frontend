export class TaskConfig {
  task_config_id: number;
  command_args: string;
  trigger_type: string;
  trigger_args: string;

  constructor(task_config_id: number, command_args: string, trigger_type: string, trigger_args: string) {
    this.task_config_id = task_config_id
    this.command_args = command_args
    this.trigger_type = trigger_type
    this.trigger_args = trigger_args
  }
}
