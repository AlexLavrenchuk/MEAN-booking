import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private subject = new Subject<any>();
  constructor() { }

  open(data: any) {
    this.subject.next({type: "open", data: data});
  }

  approval(data: any) {
    this.subject.next({type: "approval", data: data});
  }
  
  closed(data: any) {
    this.subject.next({type: "closed", data: data});
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
