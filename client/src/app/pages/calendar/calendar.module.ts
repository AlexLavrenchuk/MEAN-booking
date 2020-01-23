import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


// routing
import { CalendarRoutingModule } from './calendar-routing.module';

// template
import { MainTemplateModule } from 'src/app/_shared/modules/main-template/main-template.module';

// shared module
import { SharedModule } from 'src/app/_shared/modules/shared/shared.module';

// calender
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    MainTemplateModule,
    SharedModule,
  ]
})
export class CalendarModule { }
