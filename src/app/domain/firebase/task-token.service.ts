import { InjectionToken } from '@angular/core';
import { TaskRepository } from '../../infraestructure/repository/task.repository';

export const TASK_REPOSITORY = new InjectionToken<TaskRepository>('TASK_REPOSITORY');
