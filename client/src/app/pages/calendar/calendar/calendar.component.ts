import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
    {time: "8:00", value: 0},
    {time: "8:30", value: 30},
    {time: "9:00", value: 60},
    {time: "9:30", value: 90},
    {time: "10:00", value: 120},
    {time: "10:30", value: 150},
    {time: "11:00", value: 180},
    {time: "11:30", value: 210},
    {time: "12:00", value: 240},
    {time: "12:30", value: 270},
    {time: "13:00", value: 300},
    {time: "13:30", value: 330},
    {time: "14:00", value: 360},
    {time: "14:30", value: 390},
    {time: "15:00", value: 420},
    {time: "15:30", value: 450},
    {time: "16:00", value: 480},
    {time: "16:30", value: 510},
    {time: "17:00", value: 540}
  ];
  private addFormEvent: FormGroup;
  private loader: boolean = false;
  private events: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private eventsService: EventsService,
    private renderer: Renderer2,
  ) { }

  @ViewChild('eventsContainer', { static: false }) eventsContainer: ElementRef;

  ngOnInit() {
    this.getEvents();
    this.addFormEvent = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    },{validator: this.validatorTimeEnd('start', 'end')});
  }
  validatorTimeEnd(first: string, second: string) {
    return (group: FormGroup) => {
      if (group.controls[first].value >= group.controls[second].value) {
        return group.controls[second].setErrors({lessThenStart: true});
      } else {
        return group.controls[second].setErrors(null);
      }
    }
  }

  private getEvents() {
    this.loader = true;
    this.eventsService.getAll().pipe(first()).subscribe(
      (response: any) => { 
        this.events = response;
        response.forEach(item => {
          this.createEvent(item);
        });
        this.loader = false;
      },
      error => {
        this.alertService.error(error.error.massage || "Error")
        this.loader = false;
      }
    );
  }

  private addNewEvent() {
    if (this.addFormEvent.invalid) {
      return;
    }

    this.eventsService.addNew(this.addFormEvent.value).pipe(first()).subscribe(
      (response: any) => { 
        this.cleaningInputForm();
        this.alertService.success(response.massage);
        this.getEvents();
      },
      error => {
        this.alertService.error(error.error.massage || "Error");
      }
    );
  }

  private cleaningInputForm() {
    this.addFormEvent.reset()
    this.addFormEvent.controls.title.setErrors(null);
    this.addFormEvent.controls.start.setErrors(null);
    this.addFormEvent.controls.end.setErrors(null);
  }

  private createEvent(setting) {
    const div = this.renderer.createElement('div');
    const divText = this.renderer.createText(setting.title);
    this.renderer.appendChild(div, divText);
    this.renderer.setStyle(div, "top", `${setting.start * 2}px`);
    this.renderer.setStyle(div, "height", `${setting.duration * 2}px`);
    this.renderer.setAttribute(div, "data-event_id", `${setting._id}`);
    this.renderer.addClass(div, "event");
    this.renderer.appendChild(this.eventsContainer.nativeElement, div);
  }
}
