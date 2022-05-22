import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {AuthService} from "../../auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    }
  };

  constructor(private fb: FormBuilder, public router: Router, public authService: AuthService, public message: NzMessageService) {
    const { required, maxLength, minLength} = MyValidators;
    this.loginForm = this.fb.group({
      username: ['', [required, maxLength(12), minLength(5)]],
      password: ['', [required, minLength(6)]]
    });
  }

  get username(): AbstractControl {
    return this.loginForm.get('username')!;
  }
  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  login(): void {
    if (this.loginForm.valid) {
      let user = this.loginForm.value;
      this.authService.login(user).subscribe({
        next: (res: string) => {
          sessionStorage.setItem("token", res);
          user.password="";
          sessionStorage.setItem("user", JSON.stringify(user))
          this.message.success("authentication success");
          this.router.navigate(['/dashboard']).then(ignore => {});
        },
        error: (err: HttpErrorResponse) => {
          this.message.error(err.error);
        },
        complete: () => {
        }
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
  }


}

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }
}
