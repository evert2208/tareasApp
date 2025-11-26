import { Observable } from 'rxjs';
import { Tasks } from '../entities/task.entity';


export abstract class TaskRepository {
abstract getTasks(): Observable<Tasks[]>;
abstract addTask(task: Tasks): Promise<string>;
abstract updateTask(id: string, task: Partial<Tasks>): Promise<void>;
abstract deleteTask(id: string): Promise<void>;
}
