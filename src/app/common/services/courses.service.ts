import { Course } from './../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



const BASE_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  model = 'courses';
  constructor(private http: HttpClient) { }

  // help functions
  getURL() {
    return `${BASE_URL}/${this.model}`
  }

  getUrlWithID(id: string) {
    return `${this.getURL()}/${id}`
  }

  // CRUD Functions

  // Get all items
  getAll() {
    return this.http.get(this.getURL());
  }

  // Get item by ID
  getWithID(id: string) {
    return this.http.get(this.getUrlWithID(id));
  }

  // Create new item
  create(course: Course) {
    return this.http.post(this.getURL(), course);
  }

  // Update item with ID
  update(course:Course){
    return this.http.put(this.getUrlWithID(course.id), course);
  }

  // delete item
  delete(id:string){
    return this.http.delete(this.getUrlWithID(id))
  }



}
