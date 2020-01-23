import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainTemplateComponent } from 'src/app/_shared/containers/main-template/main-template.component';
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { BulletinBoardDetailsComponent } from './bulletin-board-details/bulletin-board-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainTemplateComponent,
    children: [
      {
        path: '',
        component: BulletinBoardComponent
      },
      {
        path: ':id',
        component: BulletinBoardDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulletinBoardRoutingModule { }
