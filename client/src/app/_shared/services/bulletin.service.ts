import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { checkType } from './../helpers/checkTypeObject';

@Injectable()
export class BulletinService {
	constructor(private http: HttpClient) { }

	private addGuardAuthToHeaders() {
		return {headers: new HttpHeaders({'Authorization': `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`})};
	}

	getAll() {
		return this.http.get(`/api/bulletin/getAll`);
	}
	getOnlySearch(value: string) {
		return this.http.get(`/api/bulletin/getSearch/` + value);
	}

	getById(id: string) {
		return this.http.get(`/api/bulletin/getById/` + id, this.addGuardAuthToHeaders());
	}

	getByCurrentUser() {
		return this.http.get(`/api/bulletin/getByCurrentUser`, this.addGuardAuthToHeaders());
	}

	addNew(newBulletin: any) {
		const httpOptions = this.addGuardAuthToHeaders();

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
		return this.http.delete(`/api/bulletin/delete/` + id, this.addGuardAuthToHeaders());
	}
}