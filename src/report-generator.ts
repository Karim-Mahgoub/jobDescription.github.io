// In a new file, e.g., report-generator.ts

export function generateReport(user: any, jobDetails: any): string {
  const report = `
    Job Application Report

    Applicant Information:
    Full Name: ${user.fullName}
    Email: ${user.email}
    Mobile: ${user.mobile}

    Job Details:
    Job Title: ${jobDetails.Job}
    Location: ${jobDetails.location}
    Posted: ${jobDetails.posted}
    Job Type: ${jobDetails.Job_Type}
    `;

  return report;
}
