import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  getAll() {
		return this.http.get(`/api/event/getAll`);
  }
  addNew(newEvent: any) {
		return this.http.get(`/api/event/addNev`, newEvent);
	}
}
