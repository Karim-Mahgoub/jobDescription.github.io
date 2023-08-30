import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', Validators.required],
    });
  }

  checkDuplicateEmail(email: string): Observable<boolean> {
    return this.http.get<any[]>('http://localhost:3000/signupUsers').pipe(
      map((users) => {
        return users.some((user) => user.email === email);
      })
    );
  }

  signUp() {
    if (this.signupForm.invalid) {
      alert('Please fill in all required fields with valid data.');
      return;
    }

    const email = this.signupForm.get('email')!.value;

    // Check for duplicate email
    this.checkDuplicateEmail(email).subscribe((isDuplicate) => {
      if (isDuplicate) {
        alert('Email already exists. Please use a different email.');
      } else {
        // If no duplicate email, proceed with signup
        this.http
          .post<any>('http://localhost:3000/signupUsers', this.signupForm.value)
          .subscribe(
            (res) => {
              alert('Signup Successful');
              this.signupForm.reset();
              this.router.navigate(['login']);
            },
            (err) => {
              alert('Something went wrong');
            }
          );
      }
    });
  }
  passwordFieldType: string = 'password';

  // this method to toggle password visibility
  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
