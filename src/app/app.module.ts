import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './shared/api.service';
import { SignupComponent } from './signup/signup.component';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    EmployeeAttendanceComponent,
    LoginComponent,
    SignupComponent,
    EmployeeSalaryComponent,
    EmployeeSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,           
    MatDatepickerModule,        
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [ApiService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
