import { Inject, Injectable } from "@angular/core";
import { TaskRepository } from "../repository/task.repository";
import {Tasks} from '../entities/task.entity'
import { TaskFirebaseService } from "src/app/domain/firebase/task.firebase.service";

@Injectable({ providedIn: 'root' })
export class CreateTaskUseCase {
constructor(private repo: TaskFirebaseService) {}
execute(task: Tasks) {
return this.repo.addTask(task);
}
}
