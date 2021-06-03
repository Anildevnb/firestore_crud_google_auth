import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/department.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/shared/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  list!: Department[];
  constructor(private service: DepartmentService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getDepartments().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as object)
        } as Department;
      })
    });
  }

  onEdit(emp: Department) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete ?")) {
      this.firestore.doc('department/' + id).delete();
      this.toastr.error('Deleted successfully','Department');
    }
  }

  transform(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }

}
