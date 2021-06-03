import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/shared/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(public service: DepartmentService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      departmentName: '',
      departmentCode: ''
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('department').add(data);
    else
      this.firestore.doc('department/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Register');
  }

}
