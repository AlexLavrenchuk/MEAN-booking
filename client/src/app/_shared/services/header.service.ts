import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable()
export class HeaderService {
  constructor(private http: HttpClient) { }

  
}
