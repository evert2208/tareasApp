import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tasks } from '../../infraestructure/entities/task.entity';
import { TaskRepository } from '../../infraestructure/repository/task.repository';

@Injectable({ providedIn: 'root' })
export class TaskFirebaseService implements TaskRepository {

  constructor(private firestore: Firestore) {}

  getTasks(): Observable<Tasks[]> {
    const ref = collection(this.firestore, 'tasks');
    return collectionData(ref, { idField: 'id' }) as Observable<Tasks[]>;
  }

  async addTask(task: Tasks): Promise<string> {
    const ref = collection(this.firestore, 'tasks');
    const docRef = await addDoc(ref, task);
    return docRef.id;
  }

  updateTask(id: string, data: Partial<Tasks>): Promise<void> {
    const ref = doc(this.firestore, `tasks/${id}`);
    return updateDoc(ref, data);
  }

  updateTaskCategory(taskId: string, categoryId: string) {
    const ref = doc(this.firestore, `tasks/${taskId}`);
    return updateDoc(ref, { categoryId });
  }

  deleteTask(id: string): Promise<void> {
    const ref = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(ref);
  }
}

