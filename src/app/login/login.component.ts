import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errors = new Subject<{ email: string; password: string }>();
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private snackbar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = !this.submitted;
      this.auth
        .emailSignIn(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (_) => {
            this.submitted = !this.submitted;
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            this.submitted = !this.submitted;
            this.errors.next(err.error);
            this.snackbar.open(err.error.email ?? err.error.password, 'close', {
              duration: 30000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: 'error',
            });
          }
        );
    }
  }
}
