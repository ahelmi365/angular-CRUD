import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UsersComponent } from './components/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "courses", component: CoursesComponent },
  { path: "add-update-user", component: AddUpdateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
