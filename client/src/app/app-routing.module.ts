import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './_shared/guard/auth.guard'
import { AdminGuard } from './_shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/bulletinboard'
  },
  {
    path: 'auth',
    loadChildren: () => import(`./pages/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import(`./pages/admin/admin.module`).then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'bulletinboard',
    loadChildren: () => import(`./pages/bulletin-board/bulletin-board.module`).then(m => m.BulletinBoardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cabinet',
    loadChildren: () => import(`./pages/cabinet/cabinet.module`).then(m => m.CabinetModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar',
    loadChildren: () => import(`./pages/calendar/calendar.module`).then(m => m.CalendarModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'errorpage',
    loadChildren: () => import(`./pages/error-page/error-page.module`).then(m => m.ErrorPageModule),
  },
  {
    path: '**',
    redirectTo: 'errorpage'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
