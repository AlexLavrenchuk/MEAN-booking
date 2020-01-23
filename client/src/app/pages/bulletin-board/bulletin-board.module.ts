import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// routing
import { BulletinBoardRoutingModule } from './bulletin-board-routing.module';

// template
import { MainTemplateModule } from 'src/app/_shared/modules/main-template/main-template.module';

// shared module
import { SharedModule } from 'src/app/_shared/modules/shared/shared.module';

// slick slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// bulletin-board
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { BulletinBoardDetailsComponent } from './bulletin-board-details/bulletin-board-details.component';

@NgModule({
  declarations: [
    BulletinBoardComponent,
    BulletinBoardDetailsComponent
  ],
  imports: [
    CommonModule,
    BulletinBoardRoutingModule,
    MainTemplateModule,
    SharedModule,
    SlickCarouselModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class BulletinBoardModule { }
