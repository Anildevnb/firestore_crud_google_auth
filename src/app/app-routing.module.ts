import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: UserProfileComponent,  canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent,  canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentsComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**',redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
