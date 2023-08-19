import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { TasksEntity } from '../../tasks/entities/tasks.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjects) => usersProjects.project,
  )
  usersIncludes: UsersProjectsEntity[];

  @OneToMany(() => TasksEntity, (tasks) => tasks.project)
  tasks: TasksEntity[];
}
