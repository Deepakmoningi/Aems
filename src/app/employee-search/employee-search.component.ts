import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { attendanceDTO } from '../employee-attendance/employeeattendanceDTO';
import { empAttendence } from '../employee-dashboard/employee-attendance.model';
import { EmployeeModel } from '../employee-dashboard/employee-dash board.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  empSearchForm!:FormGroup;
  attendaceSubmissionForm!:FormGroup;
  empId!:any;
  public list: EmployeeModel[] =[];
  id: any;
  tostring: any;
  todayDate!:any;
  myDate:Date = new Date();
  currentdate = this.myDate.setDate(this.myDate.getDate() +0)
  currentDate = this.datePipe.transform(this.currentdate, 'YYYY-MM-dd');
  public list1: attendanceDTO[] = [];
  loadeddate!: any;
  myTime:Date=new Date();
  currenttime = this.myTime.setDate(this.myTime.getDate())
  currentTime=this.datePipe.transform(this.currenttime, 'hh:mm a');
  ateendanceObj:empAttendence=new empAttendence();
  checkin!:any;
  checkout!:any;
  disable!:boolean;
  // Id!:any;
  constructor(private formbuilder: FormBuilder,private api:ApiService,private http:HttpClient,private datePipe:DatePipe,private router:Router,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.empSearchForm=this.formbuilder.group({
      empid:['',Validators.required]
    })
    this.attendaceSubmissionForm=this.formbuilder.group({
      empId:['',Validators.required],
      checkinDate:['',Validators.required],
      checkinTime:['',Validators.required],
      checkoutDate:['',Validators.required],
      checkoutTime:['',Validators.required]
    });
  }

  getEmployee(){
    this.empId=this.empSearchForm.value.empid;
    this.api.getEmployeebyid(this.empId)
    .subscribe(res=>{
      this.list=res as EmployeeModel[];
      if(this.list.length>0)
      {
        this.disable = true;
        alert("Employee data found!!")
      }
      else{
        alert("Employee not found!!")
        this.disable = false;
        this.empSearchForm.reset();
      }
    })
  }

  onviewClick(row:any)
  {
    this.id=row.emp_Id;
    this.tostring=this.id.toString();
    localStorage.setItem('ID',this.tostring) as any;
    this.router.navigate(['empattendance']);
  }

  OnPlusClick(row:any){
    this.attendaceSubmissionForm.controls['empId'].setValue(row.emp_Id);
  }

  onsearchClick(row:any){
    this.id=row.emp_Id;
    this.tostring=this.id.toString();
    localStorage.setItem('ID',this.tostring) as any;
    this.router.navigate(['salary'])
  }

  postAttendance(){
    this.ateendanceObj.Emp_Id=this.attendaceSubmissionForm.value.empId;   
    this.checkin=this.attendaceSubmissionForm.value.checkinDate + 'T' + this.attendaceSubmissionForm.value.checkinTime;
    this.ateendanceObj.Check_In_Time=this.checkin;
    this.checkout=this.attendaceSubmissionForm.value.checkoutDate + 'T' + this.attendaceSubmissionForm.value.checkoutTime;
    this.ateendanceObj.Check_Out_Time=this.checkout;
    this.api.postAttendance(this.ateendanceObj)
    .subscribe({
      next:(res=>{
        alert(res.message);
        this.attendaceSubmissionForm.reset();
        //console.log(res.result[0].emp_Id);
      })
      ,error:(err=>{
        alert(err?.error.message);
        this.attendaceSubmissionForm.reset();
      })
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
              this.attendaceSubmissionForm.get('checkinDate')?.disable();
              this.attendaceSubmissionForm.get('checkinTime')?.disable();
              this.attendaceSubmissionForm.get('checkoutDate')?.disable();
              this.attendaceSubmissionForm.get('checkoutTime')?.disable(); 
              alert("You have already done!!");
              break;
            }
            else if(this.loadeddate == this.todayDate){
              this.attendaceSubmissionForm.get('checkinDate')?.enable();
              this.attendaceSubmissionForm.get('checkinTime')?.enable();
              this.attendaceSubmissionForm.get('checkoutDate')?.enable();
              this.attendaceSubmissionForm.get('checkoutTime')?.enable();
            }
            else{
              this.attendaceSubmissionForm.get('checkinDate')?.enable();
              this.attendaceSubmissionForm.get('checkinTime')?.enable();
              this.attendaceSubmissionForm.get('checkoutDate')?.enable();
              this.attendaceSubmissionForm.get('checkoutTime')?.enable();
            }
          }  
    })
  })
  }

  onclose()
  {
    this.attendaceSubmissionForm.reset();
  }
  onclear(){
    this.attendaceSubmissionForm.get('checkinDate')?.reset();
    this.attendaceSubmissionForm.get('checkinTime')?.reset();
    this.attendaceSubmissionForm.get('checkoutDate')?.reset();
    this.attendaceSubmissionForm.get('checkoutTime')?.reset();
  }

}
