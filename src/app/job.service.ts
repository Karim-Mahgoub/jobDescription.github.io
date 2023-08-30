import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobList: Job[] = [];

  constructor(private http: HttpClient) {}

  getJobList(): Observable<Job[]> {
    return this.http.get<Job[]>('/db.json'); // Replace with the actual path
  }

  addJob(newJob: Job): void {
    this.jobList.push(newJob);
  }

  // Add other methods as needed...

  updateJobListWithAddedJobs(addedJobs: Job[]): void {
    this.jobList = this.jobList.concat(addedJobs);
  }
}
