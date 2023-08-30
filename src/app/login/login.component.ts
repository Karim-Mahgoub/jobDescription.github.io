import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../user.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required], // Add Validators.required
      password: ['', Validators.required], // Add Validators.required
    });

    // Rest of your code...
  }

  login() {
    if (this.loginForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login Successful');
          this.loginForm.reset();
          this.userService.login(user); // Store user information
          this.router.navigate(['job']);
        } else {
          alert('Invalid Credentials');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  navigateToSignup() {
    this.ngZone.run(() => {
      this.router.navigate(['/signup']);
    });
  }
  // Add this property to the LoginComponent class
  passwordFieldType: string = 'password';

  // Add this method to toggle password visibility
  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
