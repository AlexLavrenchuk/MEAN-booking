import { HttpHeaders } from '@angular/common/http';


export const addGuardAuthToHeaders = () => {
  return {headers: new HttpHeaders({'Authorization': `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`})};
}