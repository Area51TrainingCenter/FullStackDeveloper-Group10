import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoEditorialesComponent } from './listado-editoriales/listado-editoriales.component';
import { EdicionEditorialComponent } from './edicion-editorial/edicion-editorial.component';

const routes: Routes = [
  {path: "", children: [
    {path: "", component: ListadoEditorialesComponent},
    {path: "edicion", component: EdicionEditorialComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorialesRoutingModule { }
