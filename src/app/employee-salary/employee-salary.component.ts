import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { empsalaryDTO } from './empsalaryDTO';
import { empsalinputDTO } from './empsalinputDTO';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css']
})
export class EmployeeSalaryComponent implements OnInit {
  salaryForm !: FormGroup;
  public list: empsalaryDTO[] = [];
  salinputObj: empsalinputDTO=new empsalinputDTO();
  myTime:Date=new Date();
  currenttime = this.myTime.setDate(this.myTime.getDate())
  currentTime=this.datePipe.transform(this.currenttime, 'hh:mm');
  datetime!:any;
  //testing
  myDate:Date = new Date();
  currentdate = this.myDate.setDate(this.myDate.getDate() +0)
  currentDate = this.datePipe.transform(this.currentdate, 'dd');
  month!:any;
  year!:any;
  testdatetime!:any;
  dataList:Array<any>=[];
  updatedmonth!:any;
  disable!:boolean;
  strinput=localStorage.getItem('ID') as any;
  intInput:number = +this.strinput;
  constructor(private formbuilder: FormBuilder,private api:ApiService,private http:HttpClient,private datePipe:DatePipe,private router:Router) { 
    this.dataList=[
    //{code:0,name:"Select Month"},
    {code:1,name:"January"},
    {code:2,name:"February"},
    {code:3,name:"March"},
    {code:4,name:"April"},
    {code:5,name:"May"},
    {code:6,name:"June"},
    {code:7,name:"July"},
    {code:8,name:"August"},
    {code:9,name:"September"},
    {code:10,name:"October"},
    {code:11,name:"November"},
    {code:12,name:"December"}]
  }
  ngOnInit(): void {
    this.salaryForm=this.formbuilder.group({
      empid:['',Validators.required],
      month:['',Validators.required],
      year:['',Validators.required]
      //reqDate:['']
    });
    this.onclear();
    this.salaryForm.controls['empid'].setValue(this.intInput);
  }

  getEmployeesalary()
  {
    this.salinputObj.Emp_ID=this.salaryForm.value.empid;
    if(this.salaryForm.value.month <=9)
    {
      this.updatedmonth = 0 + this.salaryForm.value.month;
    }
    else
    {
      this.updatedmonth = this.salaryForm.value.month;
    }
    this.testdatetime=this.salaryForm.value.year + '-' + this.updatedmonth + '-' + this.currentDate + 'T' + this.currentTime;
    this.datetime=this.salaryForm.value.reqDate + 'T' + this.currentTime;
    this.salinputObj.month_year=this.testdatetime
    this.api.getEmployeeSalary(this.salinputObj)
    .subscribe(res=>{
      this.list=res as empsalaryDTO[];
      if(this.list.length>0)
      {
        this.disable = true;
        alert("Employee data found!!")
      }
      else{
        alert("Employee data not found!!")
        this.disable = false;
        this.salaryForm.reset();
      }
    })
  }

  onclear(){
    // this.salaryForm.get('empid')?.reset();
    this.salaryForm.get('month')?.reset();
    this.salaryForm.get('year')?.reset();
  }
  perform(){
    this.router.navigate(['empsearch'])
    localStorage.clear();
  }
  

}
