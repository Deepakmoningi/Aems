import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { EmployeeModel } from './employee-dash board.model';
import { ApiService } from '../shared/api.service';
import { map, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { empAttendence } from './employee-attendance.model';
import { DatePipe, formatDate, Time } from '@angular/common';
import { Router } from '@angular/router';
import { attendanceDTO } from '../employee-attendance/employeeattendanceDTO';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formvalue !: FormGroup;
  employeeModelobj : EmployeeModel=new EmployeeModel();
  ateendanceObj:empAttendence=new empAttendence();
  public list: EmployeeModel[] | undefined;
  public list1: attendanceDTO[] = [];
  employeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  attendaceForm!:FormGroup;
  emp_Id!:number;
  checkin!:any;
  checkout!:any;
  id!:number;
  tostring!:string;
  isDisabled! : boolean;
  loadeddate!: any;
  //for calendar
  myDate:Date = new Date();
  currentdate = this.myDate.setDate(this.myDate.getDate() +0)
  currentDate = this.datePipe.transform(this.currentdate, 'YYYY-MM-dd');
  todayDate!:any;
  //for checkout
  myTime:Date=new Date();
  currenttime = this.myTime.setDate(this.myTime.getDate())
  currentTime=this.datePipe.transform(this.currenttime, 'hh:mm a');
  constructor(private formbuilder: FormBuilder,private api:ApiService,private http:HttpClient,private datePipe:DatePipe,private router:Router) { }
  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      empid:['',Validators.required],
      empname:['',Validators.required],
      annsalary:['',Validators.required],
      edeptid:['',Validators.required]
    });
    this.attendaceForm=this.formbuilder.group({
      empId:[''],
      checkinDate:[''],
      checkinTime:[''],
      checkoutDate:[''],
      checkoutTime:['']
    });
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  postEmployeeDetails(){
    this.employeeModelobj.emp_Id=this.formvalue.value.empid; 
    this.employeeModelobj.emp_Name=this.formvalue.value.empname;
    this.employeeModelobj.annual_salary=this.formvalue.value.annsalary;
    this.employeeModelobj.e_Dept_Id=this.formvalue.value.edeptid;
    //this.employeeModelobj.salary=this.formvalue.value.salary;

    this.api.postEmployee(this.employeeModelobj)
    .subscribe(res=>{
      console.log(res);
      alert(res.message);
      this.formvalue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Invalid Request");
      this.formvalue.reset();
    })
  }

  //main
  postAttendance(){
    this.ateendanceObj.Emp_Id=this.attendaceForm.value.empId;   
    this.checkin=this.attendaceForm.value.checkinDate + 'T' + this.attendaceForm.value.checkinTime;
    this.ateendanceObj.Check_In_Time=this.checkin;
    this.checkout=this.attendaceForm.value.checkoutDate + 'T' + this.attendaceForm.value.checkoutTime;
    this.ateendanceObj.Check_Out_Time=this.checkout;
    this.api.postAttendance(this.ateendanceObj)
    .subscribe({
      next:(res=>{
        alert(res.message);
        this.attendaceForm.reset();
        //console.log(res.result[0].emp_Id);
      })
      ,error:(err=>{
        alert(err?.error.message);
        this.attendaceForm.reset();
      })
    })
  }

  getAllEmployee(){
    this.http.get("https://localhost:7269/api/Emp/GetAllEmployees")
    .subscribe(res=>{
      this.list=res as EmployeeModel[];
      //console.log(res);
    })
  }
  deleteEmp(row:any){
    alert("Are you sure to delete "+row.emp_Id)
    this.api.deleteEmployee(row.emp_Id)
    .subscribe(res=>{
      alert("Employee record Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    //this.employeeModelobj.emp_Id=row.emp_Id;
    this.formvalue.controls['empid'].setValue(row.emp_Id);
    this.formvalue.controls['empname'].setValue(row.emp_Name);
    this.formvalue.controls['annsalary'].setValue(row.annual_salary);
    this.formvalue.controls['edeptid'].setValue(row.e_Dept_Id);
  }

  onviewClick(row:any)
  {
    this.id=row.emp_Id;
    this.tostring=this.id.toString();
    localStorage.setItem('ID',this.tostring) as any;
    this.router.navigate(['empattendance']);
  }

  OnPlusClick(row:any){
    //this.ateendanceObj.Emp_Id=row.emp_Id;
    this.attendaceForm.controls['empId'].setValue(row.emp_Id);
  }
  updateEmployeeDetails(){
    this.employeeModelobj.emp_Id=this.formvalue.value.empid; 
    this.employeeModelobj.emp_Name=this.formvalue.value.empname;
    this.employeeModelobj.annual_salary=this.formvalue.value.annsalary;
    this.employeeModelobj.e_Dept_Id=this.formvalue.value.edeptid;

    this.api.updateEmployee(this.employeeModelobj)
    .subscribe(res=>{
      alert("Employee record Updated Successfully");
      this.formvalue.reset();
      this.getAllEmployee();
    })
  }

  
  checkCheckInTime(id:any,checkDate:any){
    this.todayDate = this.datePipe.transform(this.currentdate,'yyyy-MM-dd')
    this.api.getEmployeeAttendancebyId(id)
    .subscribe({
      next:(res=>{
        this.list1=res as attendanceDTO[];
        for(var i=0;i<this.list1.length;i++){
          this.loadeddate = this.datePipe.transform(this.list1[i].check_In_Time, 'yyyy-MM-dd');
          if((this.loadeddate == checkDate) && (this.list1[i].emp_Id == id) && (this.loadeddate < this.todayDate)){ 
              // console.log(this.todayDate);
              // console.log(this.loadeddate);
              // console.log(this.loadeddate < this.todayDate);
              this.attendaceForm.get('checkinDate')?.disable();
              this.attendaceForm.get('checkinTime')?.disable();
              this.attendaceForm.get('checkoutDate')?.disable();
              this.attendaceForm.get('checkoutTime')?.disable(); 
              alert("You have already done!!");
              break;
            }
            else if(this.loadeddate == this.todayDate){
              this.attendaceForm.get('checkinDate')?.enable();
              this.attendaceForm.get('checkinTime')?.enable();
              this.attendaceForm.get('checkoutDate')?.enable();
              this.attendaceForm.get('checkoutTime')?.enable();
            }
            else{
              this.attendaceForm.get('checkinDate')?.enable();
              this.attendaceForm.get('checkinTime')?.enable();
              this.attendaceForm.get('checkoutDate')?.enable();
              this.attendaceForm.get('checkoutTime')?.enable();
            }
          }  
    })
  })
  }

  onclose()
  {
    this.attendaceForm.reset();
  }
  onclear(){
    this.attendaceForm.get('checkinDate')?.reset();
    this.attendaceForm.get('checkinTime')?.reset();
    this.attendaceForm.get('checkoutDate')?.reset();
    this.attendaceForm.get('checkoutTime')?.reset();
  }
}

