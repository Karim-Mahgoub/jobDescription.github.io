import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: any = {};
  private appliedJobs: Job[] = [];
  private savedJobs: Job[] = [];

  constructor(private http: HttpClient) {}

  login(user: any) {
    // Simulate successful login, replace with actual authentication logic
    this.currentUser = user;
  }
  addJob(newJob: Job): Observable<any> {
    return this.http.post('/path/to/job-list.json', newJob);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser.user_id;
  }

  getJobList(): Observable<Job[]> {
    return this.http.get<Job[]>('/db.json'); // Replace with the actual path
  }

  saveAppliedJob(job: Job): void {
    if (this.isLoggedIn()) {
      this.appliedJobs.push(job);
    }
  }

  getAppliedJobs(): Job[] {
    console.log('Saved Jobs:', this.appliedJobs);
    return this.appliedJobs;
  }

  deleteAppliedJob(job: Job): void {
    if (this.isLoggedIn()) {
      const index = this.appliedJobs.findIndex(
        (appliedJob) => appliedJob.id === job.id
      );
      if (index !== -1) {
        this.appliedJobs.splice(index, 1);
      }
    }
  }

  saveJob(job: Job): void {
    if (this.isLoggedIn() && !this.isJobSaved(job)) {
      this.savedJobs.push(job);
    }
  }

  isJobSaved(job: Job): boolean {
    return this.savedJobs.some((savedJob) => savedJob.id === job.id);
  }

  removeSavedJob(job: Job): void {
    if (this.isLoggedIn()) {
      const index = this.savedJobs.findIndex(
        (savedJob) => savedJob.id === job.id
      );
      if (index !== -1) {
        this.savedJobs.splice(index, 1);
      }
    }
  }

  updateAppliedJobs(appliedJobArr: Job[]): void {
    if (this.isLoggedIn()) {
      this.appliedJobs = appliedJobArr;
    }
  }

  isJobApplied(job: Job): boolean {
    return this.appliedJobs.some((appliedJob) => appliedJob.id === job.id);
  }

  applyJob(job: Job): void {
    if (this.isLoggedIn() && !this.isJobApplied(job)) {
      this.appliedJobs.push(job);
    }
  }
  clearAppliedJobs(): void {
    this.appliedJobs = [];
  }
}
