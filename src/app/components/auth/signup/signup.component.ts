import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myReactiveForm: FormGroup;
  isVerified = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService,
    private _router: Router,
    private _empService: EmployeeService

  ) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }
  onSubmit() {
    if (this.myReactiveForm.invalid)
      this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
    if (this.myReactiveForm.valid) {
      const body = this.generateBodyForSignUp(this.myReactiveForm.value);
      this._empService.registerUser(body).subscribe((res: any) => {
        alert(res.message);
      }, (error) => {
        alert(error.message);
      }, () => {
        this._router.navigate(['/'])
      });
    }
  }

  generateBodyForSignUp(data) {
    const body = {};
    body["firstName"] = data.firstName;
    body["lastName"] = data.lastName;
    body["email"] = data.email;
    body["password"] = data.password;
    body["confirmPassword"] = data.confirmPassword;
    body["acceptTerms"] = data.acceptTerms;
    body["isVerified"] = this.isVerified;
    return body;

  }

}
