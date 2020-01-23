import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_shared/services/alert.service';
import { EventsService } from 'src/app/_shared/services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private timeSet: any = [
    {time: "8:00"},
    {time: "8:30"},
    {time: "9:00"},
    {time: "9:30"},
    {time: "10:00"},
    {time: "10:30"},
    {time: "11:00"},
    {time: "11:30"},
    {time: "12:00"},
    {time: "12:30"},
    {time: "13:00"},
    {time: "13:30"},
    {time: "14:00"},
    {time: "14:30"},
    {time: "15:00"},
    {time: "15:30"},
    {time: "16:00"},
    {time: "16:30"},
    {time: "17:00"}
  ];
  private addFormEvent: FormGroup;
  private loader: boolean = false;
  private events: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private eventsService: EventsService,
  ) { }

  ngOnInit() {
    this.getEvents();
    this.addFormEvent = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      file: ['']
    });
  }

  private getEvents() {
    this.loader = true;
    this.eventsService.getAll().pipe(first()).subscribe(
      (response: any) => { 
        this.events = response;
        this.loader = false;
      },
      error => {
        this.alertService.error(error.error.massage || "Error")
        this.loader = false;
      }
    );
  }
}
