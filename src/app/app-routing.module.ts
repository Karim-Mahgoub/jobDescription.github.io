import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JobComponent } from './job/job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { JobDescriptionComponent } from './job-description/job-description.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'job', component: JobComponent },
  { path: 'job/:id', component: JobDetailsComponent },
  { path: 'applied-jobs', component: AppliedJobsComponent },
  { path: 'job-description', component: JobDescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
