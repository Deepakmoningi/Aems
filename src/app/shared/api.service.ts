import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { EmployeeModel } from '../employee-dashboard/employee-dash board.model';
import { empAttendence } from '../employee-dashboard/employee-attendance.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  list:EmployeeModel[] | undefined;
  checkintime:Date | undefined;
  latest_date!:any;
  emp_Id!:number;
  checkin=""
  checkout=""
  constructor(private http:HttpClient,public datePipe:DatePipe) { }
  
  postEmployee(data : any){
    //return this.http.post<any>("http://localhost:3000/posts",data)
    return this.http.post<any>("https://localhost:7269/api/Emp/insert",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>("https://localhost:7269/api/Emp/GetAllEmployees")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  

  updateEmployee(data : any){
    return this.http.put<any>("https://localhost:7269/api/Emp/update",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  deleteEmployee(id:number){
    return this.http.delete<any>("https://localhost:7269/api/Emp/delete/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  postAttendance(data:any){
    return this.http.post("https://localhost:7269/api/Emp/GetWorkinghours",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getEmployeeAttendancebyId(id:any){
    return this.http.get<any>("https://localhost:7269/api/Emp/GetemployeeAttendacebyid/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployeeSalary(data:any){
    return this.http.post("https://localhost:7269/api/Emp/GetMonthlySalarybyId",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployeebyid(id:any){
    return this.http.get<any>("https://localhost:7269/api/Emp/GetEmployeebyid/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
}
 