export interface Job {
  applied_count: any;
  id: number;
  userId: string;
  Job: string;
  location: string;
  softDeleted?: boolean; // Add this property

  posted: string;
  Job_Type: string;
  isSaved?: boolean;
  summary?: string;
  requirements?: {
    technical_skills: string[];
    soft_skills: string[];
    nice_to_have: string[];
    availability: string;
  };
  responsibilities?: {
    key_deliverables: string[];
    day_to_day: string;
  };
  benefits?: {
    compensation: string;
    employee_benefits: string[];
    training_benefits: string;
  };
}
