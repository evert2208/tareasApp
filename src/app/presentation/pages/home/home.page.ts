import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategoryFirebaseService } from 'src/app/domain/firebase/category.firebase.service';
import { FeatureFlagService } from 'src/app/domain/firebase/feature.service';
import { TaskFirebaseService } from 'src/app/domain/firebase/task.firebase.service';
import { Category } from 'src/app/infraestructure/entities/category.entity';
import { Tasks } from 'src/app/infraestructure/entities/task.entity';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // tasks$: Observable<Tasks[]>;
  tasks$: Tasks[]=[];
  showCategories = false;
  featureEnabled = false;
  enableCategories = false;
  categoriaSeleccionada: string | null = null;
  categoriaSeleccionada2: string | null = null;
  categorias: Category[]=[];
  categorias2: Category[]=[];

constructor(private taskService: TaskFirebaseService,
            private categoryService: CategoryFirebaseService,
            private flags: FeatureFlagService,
            private toastController: ToastController

) {}
  async ngOnInit() {
   this.flags.enableCategories$().subscribe(value => {
      this.enableCategories = value;
    });
    this.taskService.getTasks().subscribe(res => this.tasks$ = res);
    this.categoryService.getCategories().subscribe(res => this.categorias = res);
    this.categorias2=this.categorias;

  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
  const toast = await this.toastController.create({
    message,
    duration: 2000,
    position: 'top',
    color
  });
  await toast.present();
}



addTask(titulo: string | any): Promise<void>|any {
    if (!titulo || !titulo.trim()){
      return this.showToast('Escriba el nombre de la tarea', 'warning')
    };

    if (this.categoriaSeleccionada===null || !this.categoriaSeleccionada){
      return this.showToast('Escoga una categoria', 'warning')
    };

  this.taskService.addTask({ titulo, completado: false, categoryId: this.categoriaSeleccionada })
    .then(titulo => this.showToast(`La tarea ${titulo} fue agregada correctamente!`, 'success'))
    .catch(err => this.showToast('Error al agregar tarea', 'danger'));
    this.categoriaSeleccionada=null;
}

setCategory(task: Tasks, categoryId: string) {
this.taskService.updateTaskCategory(task.id!, categoryId);
}

filteredTasks(): Tasks[] {
if (!this.categoriaSeleccionada2) return this.tasks$;
return this.tasks$.filter(t => t.categoryId === this.categoriaSeleccionada2);
}

filteredCategory(cat: string | any) {
  if(!cat) return;
const val = this.categorias.filter(t => t.id === cat);
return val[0].nombre;
}

toggle(task: Tasks) {
this.taskService.updateTask(task.id!, { completado: !task.completado });
}


delete(task: Tasks) {
this.taskService.deleteTask(task.id!);
}

}
