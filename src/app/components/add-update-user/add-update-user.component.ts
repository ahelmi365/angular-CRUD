import { User } from 'src/app/common/models/user';
import { UsersService } from './../../common/services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

  // @Input() selectedUser: User;
  selectedUser: User;
  @Input() selecetdUserID: string = "";

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
    this.fetchSelecetdUser();
  }

  addUpdateUserForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userEmail: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userCity: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userZipcode: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userWebsite: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userCompany: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  fetchSelecetdUser() {
    if (this.selecetdUserID) {
      this.usersService.getWithID(this.selecetdUserID)
        .subscribe(res => {
          this.selectedUser = res;
          this.addUpdateUserForm.patchValue({
            userName: res.name,
            userEmail: res.email,
            userCity: res.address.city,
            userZipcode: res.address.zipcode,
            userWebsite: res.website,
            userCompany: res.company.name
          });

        });
    }
  }
  onCancelClicked() {
    // this.selectedUser = this.emptyUser;
    this.usersService.setShowAddUpdate(false);
    // console.log(this.selectedUser);

  }

  onSubmitClicked(selectedUser: User) {
    console.log(this.addUpdateUserForm.value);

    if (selectedUser.id) {
      this.updateUser(selectedUser);
    } else {
      this.selectedUser
      this.createNewUser(selectedUser);
    }
  }

  updateUser(selectedUser: User) {
    this.getAddUpdateUserForm(selectedUser);
    this.usersService.update(selectedUser)
      .subscribe(result => this.usersService.setShowAddUpdate(false));
  }

  createNewUser(selectedUser: User) {
    this.getAddUpdateUserForm(selectedUser);
    this.usersService.create(selectedUser)
      .subscribe(result => this.usersService.setShowAddUpdate(false));
  }


  getAddUpdateUserForm(selectedUser: User) {
    // selectedUser.name = this.addUpdateUserForm.get('userName')?.value ?? "";
    selectedUser.name = this.addUpdateUserForm.get('userName')?.value!;
    selectedUser.email = this.addUpdateUserForm.get('userEmail')?.value!;
    selectedUser.address.city = this.addUpdateUserForm.get('userCity')?.value!;
    selectedUser.address.zipcode = this.addUpdateUserForm.get('userZipcode')?.value!;
    selectedUser.website = this.addUpdateUserForm.get('userWebsite')?.value!;
    selectedUser.company.name = this.addUpdateUserForm.get('userCompany')?.value!;
  }

}
