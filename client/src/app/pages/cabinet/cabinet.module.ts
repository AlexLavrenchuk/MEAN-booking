import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// routing
import { CabinetRoutingModule } from './cabinet-routing.module';

// template
import { MainTemplateModule } from 'src/app/_shared/modules/main-template/main-template.module';

// shared module
import { SharedModule } from 'src/app/_shared/modules/shared/shared.module';

// cabinet
import { CabinetComponent } from './cabinet/cabinet.component';

@NgModule({
  declarations: [
    CabinetComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    ReactiveFormsModule,
    MainTemplateModule,
    SharedModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class CabinetModule { }
