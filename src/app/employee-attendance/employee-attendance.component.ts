import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { attendanceDTO } from './employeeattendanceDTO';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {
  public list: attendanceDTO[] | undefined;
  empid!:number;
  empcheckin!:Date;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.viewEmployeeAttendance();
  }
  strinput=localStorage.getItem('ID') as any;
  intInput:number = +this.strinput;
  
  viewEmployeeAttendance(){
    this.api.getEmployeeAttendancebyId(this.intInput)
    .subscribe({
      next:(res=>{
        this.list=res as attendanceDTO[];
        if(this.list.length>0)
        {
          alert("We got Data!!");
        }
        else{
          alert("No Data found!!");
          this.router.navigate(['dashboard']);
        }
      })
    })
  }
  
  perform(){
    // this.router.navigate(['dashboard']);
    this.router.navigate(['empsearch']);
    localStorage.clear();
  }
  
  // checkempandcheckinInAttendance(empid:any,empcheckin:any){
    
  // }
}

