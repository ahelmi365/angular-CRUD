import { UsersService } from './../../common/services/users.service';
import { User } from 'src/app/common/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;
  userID: string = "";
  showAddUpdateUser: boolean = false;
  confirmDeleteUser: boolean = false;
  toDeleteUserID:string =""

  constructor(protected usersService: UsersService) {
    this.selectedUser = {
      id: "",
      name: "",
      username: "", email: "", address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        }
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    }
  }

  ngOnInit(): void {
    this.fetchAllUsers();
    this.fetchShowAddUpdte();
  }

  fetchAllUsers() {
    this.usersService.getAll()
      .subscribe((result: any) => {
        this.users = result;
      });
  }

  fetchShowAddUpdte() {
    this.usersService.getShowAddUpdate()
      .subscribe(result => {
        this.showAddUpdateUser = result;
        this.fetchAllUsers();
      });
  }

  onDeleteClicked(id: string) {
    this.confirmDeleteUser = true;
    this.toDeleteUserID = id;
  }
  onSubmitClicked(id: string) {
    this.usersService.delete(id)
      .subscribe(result => this.fetchAllUsers());
      this.onCancelClicked();
  }

  onCancelClicked(){
    this.confirmDeleteUser = false;
    this.toDeleteUserID ="";
  }

  onEditClicked(user: User) {
    this.usersService.setShowAddUpdate(true);
    this.selectedUser = { ...user };
    this.userID = user.id;
    // console.log(user);

  }
  onAddClicked() {
    this.userID = "";
    this.usersService.setShowAddUpdate(true);
  }



}
