import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JobComponent } from './job/job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ApplyReportComponent } from './apply-report/apply-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobDescriptionComponent } from './job-description/job-description.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    JobComponent,
    JobDetailsComponent,
    AppliedJobsComponent,
    ApplyReportComponent,
    JobDescriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [UserService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
