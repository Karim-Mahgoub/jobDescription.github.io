import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  sendInternalEmail(job: any): Observable<any> {
    // Simulate sending internal email and return a mocked response
    return of({ message: 'Internal email sent successfully' });
  }

  sendExternalEmail(job: any): Observable<any> {
    // Simulate sending external email and return a mocked response
    return of({ message: 'External email sent successfully' });
  }
}
