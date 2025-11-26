import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryFirebaseService } from 'src/app/domain/firebase/category.firebase.service';
import { Category } from 'src/app/infraestructure/entities/category.entity';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {

  categories$!: Observable<Category[]>;
  newCategory = '';

  constructor(private categoryService: CategoryFirebaseService) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

   addCategory() {
    if (!this.newCategory.trim()) return;
    this.categoryService.addCategory({nombre: this.newCategory});
    this.newCategory = '';
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
  }

}
