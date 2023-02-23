import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  //{path:'',redirectTo:'dashboard',pathMatch:'full'},      //firstone
  {path:'',redirectTo:'empsearch',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:EmployeeDashboardComponent},
  {path:'empattendance',component:EmployeeAttendanceComponent},
  {path:'salary',component:EmployeeSalaryComponent},
  {path :'empsearch',component:EmployeeSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
