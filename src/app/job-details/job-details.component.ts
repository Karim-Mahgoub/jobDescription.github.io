import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  jobDetails: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId !== null) {
      const numericJobId = +jobId;

      this.http
        .get<any>('http://localhost:3000/jobList/' + numericJobId)
        .subscribe(
          (data) => {
            // Convert posted date string to Date object
            data.posted = new Date(data.posted);
            this.jobDetails = data;
          },
          (error) => {
            console.error('Error fetching job details:', error);
          }
        );
    }
  }
}
