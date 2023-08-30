import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ApplyReportComponent } from '../apply-report/apply-report.component';
import { MatDialog } from '@angular/material/dialog';
import { EmailService } from '../email.service';
import { Job } from '../job.model';

@Component({
  selector: 'applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css'],
})
export class AppliedJobsComponent implements OnInit {
  headers = ['Job', 'Location', 'Posted', 'Job Type'];
  appliedJobArr: any[] = [];
  ngZone: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.fetchAppliedJobs();
  }

  fetchAppliedJobs(): void {
    this.appliedJobArr = this.userService.getAppliedJobs();
  }

  fetchJobsFunc() {
    throw new Error('Method not implemented.');
  }

  deleteJob(job: Job): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this job?'
    );
    if (confirmed) {
      console.log('Deleting job:', job);

      // Call the UserService to delete the job
      this.userService.deleteAppliedJob(job);

      // Mark the job as soft deleted
      job.softDeleted = true;

      this.cdRef.detectChanges();
    }
  }

  goBackToJobList(): void {
    this.router.navigate(['/job']);
  }
  openApplyReportModal(job: any): void {
    console.log('Job details:', job);
    const dialogRef = this.dialog.open(ApplyReportComponent, {
      width: '400px',
      data: job,
      position: {
        top: 'calc(50% + 50px)',
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('Dialog closed with result:', result);
      if (result === 'Internal') {
        console.log('Sending internal email...');
        this.emailService.sendInternalEmail(job).subscribe(
          (response) => {
            console.log('Internal email sent:', response);
          },
          (error) => {
            console.error('Internal email error:', error);
          }
        );
      } else if (result === 'External') {
        console.log('Sending external email...');
        this.emailService.sendExternalEmail(job).subscribe(
          (response) => {
            console.log('External email sent:', response);
          },
          (error) => {
            console.error('External email error:', error);
          }
        );
      }
    });
  }

  saveJob(job: Job): void {
    const confirmed = window.confirm('Are you sure you want to save this job?');
    if (confirmed) {
      console.log('Saving job:', job);

      // Call the UserService to save the job
      this.userService.saveJob(job);

      // Mark the job as soft deleted
      job.softDeleted = true;

      this.cdRef.detectChanges();
    }
  }
}
