import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  formData!: Department;

  constructor(private firestore: AngularFirestore) { }

  getDepartments() {
    return this.firestore.collection('department').snapshotChanges();
  }
}
