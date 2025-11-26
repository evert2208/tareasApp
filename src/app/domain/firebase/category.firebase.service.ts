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
import { Category } from 'src/app/infraestructure/entities/category.entity';
import { CategoryRepository } from 'src/app/infraestructure/repository/category.repository';

@Injectable({ providedIn: 'root' })
export class CategoryFirebaseService implements CategoryRepository {

  constructor(private firestore: Firestore) {}

  getCategories(): Observable<Category[]> {
    const ref = collection(this.firestore, 'categories');
    return collectionData(ref, { idField: 'id' }) as Observable<Category[]>;
  }

  async addCategory(category: Category): Promise<string> {
    const ref = collection(this.firestore, 'categories');
    const docRef = await addDoc(ref, category);
    return docRef.id;
  }

  updateCategory(id: string, data: Partial<Category>): Promise<void> {
    return updateDoc(doc(this.firestore, `categories/${id}`), data);
  }

  deleteCategory(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, `categories/${id}`));
  }
}
