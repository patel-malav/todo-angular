import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  back = '/login';
  codeSent = false;
  resetCodeForm: FormGroup;
  resetPasswordForm: FormGroup;
  constructor(
    public location: Location,
    fb: FormBuilder,
    private auth: AuthService
  ) {
    this.resetCodeForm = fb.group({
      email: [null, [Validators.required, Validators.minLength(8)]],
    });
    this.resetPasswordForm = fb.group({
      code: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}
  onSubmitResetCode(): void {
    if (this.resetCodeForm.valid) {
      this.codeSent = !this.codeSent;
      this.auth.sendResetCode(this.resetCodeForm.value.email);
      this.resetCodeForm.reset();
    }
  }

  onSubmitResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.auth.updatePassword(
        this.resetPasswordForm.value.code,
        this.resetPasswordForm.value.password
      );
    }
  }
}
