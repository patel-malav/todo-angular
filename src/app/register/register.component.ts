import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Errors {
  name: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errors = new Subject<Errors>();
  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ) {
    this.registerForm = fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      consent: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.auth
        .emailSignUp(
          this.registerForm.value.username,
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .subscribe(
          (confirmation: { ok: string }) => {
            this.submitted = !this.submitted;
            this.snackbar.open(confirmation.ok + ' !!', 'close', {
              duration: 10000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: 'error',
            });
          },
          (err: HttpErrorResponse) => {
            console.log(err);
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
