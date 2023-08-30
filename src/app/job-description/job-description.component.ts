import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css'],
})
export class JobDescriptionComponent implements OnInit {
  jobForm!: FormGroup;
  locationData: any[] = [];
  policiesProcessesArray: string[] = [];
  roleResponsibilitiesArray: string[] = [];
  reportsArray: string[] = [];
  exreportsArray: string[] = [];

  qualificationArray: string[] = [];
  workExperienceArray: string[] = [];
  behavioralCompetenciesArray: string[] = [];
  private addedJobs: Job[] = [];
  jobs: Job[] | undefined;
  filteredJobArr: any;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private jobService: JobService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      Job: new FormControl('', Validators.required),
      division: new FormControl(''),
      Job_Type: new FormControl('', Validators.required),
      department: new FormControl(''),
      section: new FormControl(''),
      jobGrade: new FormControl(''),
      jobNature: new FormControl(''),
      location: new FormControl('', Validators.required),
      jobPurpose: new FormControl('', Validators.required),
      policiesProcesses: new FormControl(''),
      roleResponsibilities: new FormControl(''),
      reports: new FormControl(''),
      exreports: new FormControl(''),

      qualification: new FormControl(''),
      workExperience: new FormControl(''),
      behavioralCompetencies: new FormControl(''),
      languageSkills: new FormControl(''),
    });
    this.fetchLocationData();
    this.policiesProcessesArray = ['• '];
    this.reportsArray = ['• '];
    this.exreportsArray = ['• '];
    this.roleResponsibilitiesArray = ['• '];
    this.qualificationArray = ['• '];
    this.workExperienceArray = ['• '];
    this.behavioralCompetenciesArray = ['• '];

    // initial value of the textarea to a bullet point
    if (this.jobForm) {
      this.jobForm.get('policiesProcesses')!.setValue('• ');
      this.jobForm.get('roleResponsibilities')!.setValue('• ');
      this.jobForm.get('reports')!.setValue('• ');
      this.jobForm.get('exreports')!.setValue('• ');
      this.jobForm.get('qualification')!.setValue('• ');
      this.jobForm.get('workExperience')!.setValue('• ');
      this.jobForm.get('behavioralCompetencies')!.setValue('• ');
    }
  }
  addJob(newJob: Job): void {
    this.addedJobs.push(newJob);
  }
  updateJobListWithAddedJobs(): void {
    this.jobService.updateJobListWithAddedJobs(this.addedJobs);
    this.addedJobs = []; // Clear the addedJobs array after updating
  }
  postJob(): void {
    const invalidControls = Object.keys(this.jobForm.controls).filter(
      (controlName) => this.jobForm.controls[controlName].invalid
    );

    if (invalidControls.length > 0) {
      invalidControls.forEach((controlName) => {
        this.jobForm.controls[controlName].markAsTouched();
      });

      return;
    }
    if (this.jobForm.valid) {
      const newJob: Job = this.jobForm.value;

      //  current date to the new job data
      const currentDate = new Date();
      newJob.posted = this.datePipe.transform(currentDate, 'd-MMM-yyyy') || '';

      // Send the new job data to the JSON server
      this.http.post('http://localhost:3000/jobList', newJob).subscribe(
        (response) => {
          console.log('Job data posted successfully:', response);
        },
        (error) => {
          console.error('Error posting job data:', error);
        }
      );
    }
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  fetchLocationData() {
    this.http
      .get<any[]>('https://trial.mobiscroll.com/content/countries.json')
      .subscribe(
        (data) => {
          this.locationData = data;
        },
        (error) => {
          console.error('Error fetching location data:', error);
        }
      );
  }
  handleTextareaKeyDown(
    event: KeyboardEvent,
    bulletPoints: string[],
    textarea: HTMLTextAreaElement
  ) {
    const currentText = textarea.value;

    if (event.key === 'Enter') {
      event.preventDefault();

      // Check if there's content after Enter
      const remainingText = currentText
        .substring(textarea.selectionStart)
        .trim();

      if (remainingText.length === 0) {
        // If Enter is pressed on an empty line, add a bullet point and move to the next line
        if (bulletPoints.length < 5) {
          const bulletPoint = '• ';
          const newText = '\n' + bulletPoint;
          bulletPoints.push(newText);
          textarea.value =
            currentText.substring(0, textarea.selectionStart) +
            newText +
            remainingText;
          this.adjustTextareaHeight(textarea);
        }
      } else {
        // If there's content, add a bullet point before the text
        if (bulletPoints.length < 5) {
          const bulletPoint = '• ';
          const newText = '\n' + bulletPoint + remainingText;
          bulletPoints.push(newText);
          textarea.value =
            currentText.substring(0, textarea.selectionStart) + newText;
          this.adjustTextareaHeight(textarea);
        }
      }
    }
  }

  handleTextareaInput(bulletPoints: string[], textarea: HTMLTextAreaElement) {
    const lines = textarea.value.split('\n');

    // Filter out any lines that don't start with a bullet point
    const bulletPointLines = lines.filter((line) =>
      line.trim().startsWith('• ')
    );

    // Update the bulletPoints array with the new bullet point lines
    bulletPoints.length = 0;
    bulletPoints.push(...bulletPointLines);

    // Remove any empty lines
    textarea.value = bulletPointLines.join('\n');

    // If there are no bullet points, add a new one
    if (bulletPoints.length === 0) {
      bulletPoints.push('• ');
      textarea.value = '• ';
    }
  }
  navigateToJobComponent() {
    this.router.navigate(['/job']);
  }
  // Inside the JobDescriptionComponent class

  isFormControlValid(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control
      ? control.valid && (control.dirty || control.touched)
      : false;
  }

  isFormControlInvalid(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  isFormControlTouched(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control ? control.touched : false;
  }

  isFormControlError(controlName: string, errorName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }
  clearTextareaContent(textarea: HTMLTextAreaElement): void {
    textarea.value = '';
  }
}
