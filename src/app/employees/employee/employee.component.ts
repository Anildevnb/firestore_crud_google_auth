import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Department } from 'src/app/shared/department.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  list!: Department[];
  constructor(public service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

 
  ngOnInit() {
    this.resetForm();

    this.service.getDepartments().subscribe(actionArray => {
      
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as object)
        } as Department;
      })
    });
   
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      department: '',
      fullName: '',
      position: '',
      empCode: '',
      mobile: '',
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('employees').add(data);
    else
      this.firestore.doc('employees/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Register');
  }

}
