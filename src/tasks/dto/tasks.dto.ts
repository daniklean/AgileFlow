import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { STATUS_TASK } from '../../config/status-task';
import { ProjectDTO } from '../../projects/dto/projects.dto';

export class TasksDTO {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @IsNotEmpty()
  @IsString()
  resposableName: string;

  @IsOptional()
  project: ProjectDTO;
}
