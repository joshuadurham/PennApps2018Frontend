import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from './student';
@Injectable()
export class DataServiceService {

  constructor(private http: HttpClient) { }

  getBullyingEvents() {
    return this.http.get('URL_FOR_GET');
  }

  getRecentBullyingEvents() {
    return this.http.get('URL_FOR_GET');
  }

  getBullyingEventsByStudent(id: number) {
    return this.http.get(`URL_FOR_GET/${id}`);
  }

  getBullyingEventsWithinTime(hours: number) {
    return this.http.get(`URL_FOR_GET/${hours}`);
  }

  getAllStudents() {
    return this.http.get('URL_FOR_GET');
  }

  createNewStudent(student: Student) {
    return this.http.post('URL_FOR_POST', student);
  }

  updateStudent(student: Student) {
    return this.http.put('URL_FOR_PUT', student);
  }

  deleteStudent(id: number) {
    return this.http.delete(`URL_FOR_DELETE/${id}`);
  }


}
