import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

// const BASE_URL = "https://jsonplaceholder.typicode.com";
const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  model = 'users';
  // private showAddUpdate: boolean = false;
  // private showAddUpdate$: Observable<boolean> = false;

  private showAddUpdate: boolean = false;
  private showAddUpdate$ = new BehaviorSubject(this.showAddUpdate);

  // private FilteredCategoryList = new BehaviorSubject<string[]>([]);
  // private FilteredCategoryListObs = this.FilteredCategoryList.asObservable();


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
    return this.http.get<User>(this.getUrlWithID(id));
  }

  // Create new item
  create(user: User) {
    return this.http.post(this.getURL(), user);
  }

  // Update item with ID
  update(user: User) {
    return this.http.put<User>(this.getUrlWithID(user.id), user);
  }

  // delete item
  delete(id: string) {
    return this.http.delete(this.getUrlWithID(id));
  }


  // return showAddUpdate status
  getShowAddUpdate() {
    return this.showAddUpdate$
  }

  // change showAddUpdate status
  setShowAddUpdate(status: boolean) {
    this.showAddUpdate = status;
    this.showAddUpdate$.next(this.showAddUpdate)
  }

}
