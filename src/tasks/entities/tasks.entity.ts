import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { STATUS_TASK } from '../../config/status-task';
import { BaseEntity } from '../../config/base.entity';
import { ProjectEntity } from '../../projects/entities/projects.entity';

@Entity({ name: 'tasks' })
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;
  @Column()
  taskDescription: string;
  @Column({ type: 'enum', enum: STATUS_TASK })
  status: STATUS_TASK;
  @Column()
  resposableName: string;
  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectEntity;
}
