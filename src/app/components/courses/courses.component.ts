import { CoursesService } from './../../common/services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/common/models/course';

const emptyCourse: Course = {
  id: '',
  title: '',
  description: '',
  percentComplete: 0,
  favorite: false
}
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse = emptyCourse;
  constructor(protected coursesService: CoursesService) { }

  ngOnInit(): void {
    this.fetchAllItems();
  }

  fetchAllItems() {
    this.coursesService.getAll()
      .subscribe((allCourses: any) => {
        this.courses = allCourses;
      })
  }

  onCourseClick(id: string) {
    this.coursesService.getWithID(id)
      .subscribe((course: any) => {
        this.selectedCourse = course;
      })
  }

  // create
  OnCreateClick(course: Course) {
    console.log(course);
    if (!course.id) {
      this.coursesService.create(course)
        .subscribe(result => this.fetchAllItems());
      this.selectedCourse = emptyCourse;
    }

  }

  // update
  OnUpdatdeClick(course: Course) {
    if (course.id) {
      this.coursesService.update(course)
        .subscribe(result => this.fetchAllItems());
      this.selectedCourse = emptyCourse;
    }
  }

  // delete
  OnDeleteClick(id: string) {
    this.coursesService.delete(id)
      .subscribe(result => this.fetchAllItems());
  }

  courseTrackBy(index: any, course: any) {
    return course.id;
  }
}
