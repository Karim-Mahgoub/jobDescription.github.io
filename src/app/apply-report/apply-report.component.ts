import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'apply-report',
  templateUrl: './apply-report.component.html',
})
export class ApplyReportComponent {
  reportOptions = ['Internal', 'External'];
  selectedOption: string = 'Internal';
  buttonLabel: string = 'Send';

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ApplyReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the MAT_DIALOG_DATA
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  sendEmail(): void {
    this.buttonLabel = 'Sending...';

    const userEmail = 'user@example.com';

    const emailSubject = encodeURIComponent('Job Application Report');
    const emailBody = encodeURIComponent(
      `Job Title: ${this.data.Job}\n` +
        `Location: ${this.data.location}\n` +
        `Job Type: ${this.data.Job_Type}\n` +
        `Division: ${this.data.division}\n` +
        `Department: ${this.data.department}\n` +
        `Section: ${this.data.section}\n` +
        `Job Grade: ${this.data.jobGrade}\n` +
        `Internal Report: ${this.data.reports}\n` +
        `External Report: ${this.data.exreports}\n` +
        `Job Nature: ${this.data.jobNature}\n` +
        `Qualification:\n ${this.data.qualification}\n` +
        `Work Experience:\n ${this.data.workExperience}` +
        `Behavioral Competencies:\n ${this.data.behavioralCompetencies}\n`
    );

    const mailtoUrl = `mailto:${userEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Open the default email client using the mailto URL
    window.location.href = mailtoUrl;

    this.dialogRef.close(this.selectedOption);
  }
}
