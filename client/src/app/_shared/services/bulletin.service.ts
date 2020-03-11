import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { checkType } from './../helpers/checkTypeObject';
import { addGuardAuthToHeaders } from './../helpers/addGuardAuthToHeaders';

@Injectable()
export class BulletinService {
	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get(`/api/bulletin/getAll`);
	}
	getOnlySearch(value: string) {
		return this.http.get(`/api/bulletin/getSearch/` + value);
	}

	getById(id: string) {
		return this.http.get(`/api/bulletin/getById/` + id, addGuardAuthToHeaders());
	}

	getByCurrentUser() {
		return this.http.get(`/api/bulletin/getByCurrentUser`, addGuardAuthToHeaders());
	}

	addNew(newBulletin: any) {
		const httpOptions = addGuardAuthToHeaders();

		if(checkType(newBulletin) === 'formdata') { //check type object
			httpOptions.headers.set('Content-Type', 'multipart/form-data');
			return this.http.post(`/api/bulletin/saveWithPhoto`, newBulletin, httpOptions);
		}
		return this.http.post(`/api/bulletin/saveWithoutPhoto`, newBulletin, httpOptions);
	}

	// update(bulletin: Bulletin) {
	// 	return this.http.put(`/api/bulletin/` + bulletin.id, bulletin);
	// }

	delete(id: string) {
		return this.http.delete(`/api/bulletin/delete/` + id, addGuardAuthToHeaders());
	}
}