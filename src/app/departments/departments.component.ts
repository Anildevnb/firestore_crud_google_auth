import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../shared/department.service';



@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
