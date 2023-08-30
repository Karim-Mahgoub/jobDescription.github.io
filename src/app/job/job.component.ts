import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { Job } from '../job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  jobArr: Job[] = [];
  currentUser: any = {};
  sortKey = 'updated_on';
  ascendingOrder = false;
  showJobDetailFlag = false;
  query = '';
  filteredJobArr: any[] = [];
  appliedJobArr: Job[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.fetchJobsFunc();
    this.currentUser = this.userService.getCurrentUser();
    this.appliedJobArr = this.userService.getAppliedJobs();
  }

  fetchJobsFunc(): void {
    this.http.get<any[]>('http://localhost:3000/jobList').subscribe(
      (res) => {
        this.jobArr = res.map((job, index) => ({ ...job, id: index + 1 }));
        this.filteredJobArr = [...this.jobArr];
      },
      (err) => {
        console.error('Error fetching jobs:', err);
      }
    );
  }
  // job.component.ts

  applyForJobFunc(job: Job): void {
    // Check if the user has already applied for this job
    if (this.userService.isJobApplied(job)) {
      alert('You have already applied for this job.');
      return; // Exit the method
    }

    // If the user has not applied for the job, proceed with the application
    job.applied_count++;

    // Call the UserService to save the applied job
    this.userService.saveAppliedJob(job);

    // Remove the applied job from both filteredJobArr and jobArr
    const index = this.filteredJobArr.indexOf(job);
    if (index !== -1) {
      this.filteredJobArr.splice(index, 1);
      this.jobArr.splice(this.jobArr.indexOf(job), 1);
    }

    // Update the component's applied job list
    this.appliedJobArr.push(job);
  }

  orderByFunc(iEvent: any): void {
    const key = iEvent.target.dataset.heading;
    if (key) {
      this.ascendingOrder = this.sortKey !== key ? true : !this.ascendingOrder;
      this.sortKey = key;
      this.applyOrderByAndSearch();
    }
  }

  applyOrderByAndSearch(): void {
    this.filteredJobArr = this.jobArr.filter((job) =>
      job.Job.toLowerCase().includes(this.query.toLowerCase())
    );

    if (this.ascendingOrder) {
      this.filteredJobArr.sort((a, b) =>
        a[this.sortKey] < b[this.sortKey] ? -1 : 1
      );
    } else {
      this.filteredJobArr.sort((a, b) =>
        a[this.sortKey] > b[this.sortKey] ? -1 : 1
      );
    }
  }

  checkJobApplStatusFunc(job: any): boolean {
    return job.applied_count > 0;
  }

  formatDate(date: string | null): string {
    if (date === null || date === '') {
      return '';
    }

    const formattedDate = this.datePipe.transform(date, 'd-MMM-yyyy');
    return formattedDate || '';
  }
  navigateToAppliedJobs(): void {
    this.ngZone.run(() => {
      this.router.navigate(['/applied-jobs']);
    });
  }
  confirmLogout(): void {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      // Clear the applied jobs for the current user
      this.userService.clearAppliedJobs();

      // User confirmed, navigate to the login page
      this.router.navigateByUrl('/login');
    }
  }
  navigateToAddJob(): void {
    this.router.navigate(['/job-description']);

    const addJobButton = document.getElementById('addJobBtn');
    if (addJobButton) {
      addJobButton.classList.add('add-job-btn');
    }
  }

  deleteJob(job: Job): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this job?'
    );
    if (confirmed) {
      // Call the UserService to delete the job
      this.userService.deleteAppliedJob(job);

      // Remove the job from local arrays
      const index = this.filteredJobArr.findIndex(
        (filteredJob) => filteredJob.id === job.id
      );
      if (index !== -1) {
        this.filteredJobArr.splice(index, 1);
      }

      const jobIndex = this.jobArr.findIndex(
        (originalJob) => originalJob.id === job.id
      );
      if (jobIndex !== -1) {
        this.jobArr.splice(jobIndex, 1);
      }
    }
  }
}
