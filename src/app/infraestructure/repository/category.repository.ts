import { Observable } from 'rxjs';
import { Category } from '../entities/category.entity';


export abstract class CategoryRepository {
  abstract getCategories(): Observable<Category[]>;
  abstract addCategory(category: Category): Promise<string>;
  abstract updateCategory(id: string, data: Partial<Category>): Promise<void>;
  abstract deleteCategory(id: string): Promise<void>;
}
