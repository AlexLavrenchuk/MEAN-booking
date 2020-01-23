import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

//component
import { AlertComponent } from '../../directives/alert/alert.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../common/loader/loader.component';



@NgModule({
  declarations: [
    AlertComponent,
    ModalComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AlertComponent,
    ModalComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
