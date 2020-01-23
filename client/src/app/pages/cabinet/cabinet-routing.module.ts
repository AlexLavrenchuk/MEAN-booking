import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainTemplateComponent } from 'src/app/_shared/containers/main-template/main-template.component';
import { CabinetComponent } from './cabinet/cabinet.component';


const routes: Routes = [
  { 
    path: '', 
    component: MainTemplateComponent,
    children: [
      {
        path: '',
        component: CabinetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
