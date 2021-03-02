import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myReactiveForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private _empService: EmployeeService,
    private customValidator: CustomValidationService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])]
    }
    );
    sessionStorage.setItem('isAuthorized', 'false');
  }

  onSubmit() {
    console.log("myReactiveForm", this.myReactiveForm);
    if (this.myReactiveForm.invalid)
      this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
    if (this.myReactiveForm.valid) {
      const body = this.generateBodyForLogin(this.myReactiveForm.value);
      this._empService.loginUser(body).subscribe(async(res: any) => {
        alert(res.message);
        this.storeJwtToken(res.data.jwtToken)
        this._empService.showNavHeaders.next(await sessionStorage.getItem('isAuthorized'))
      }, (error) => {
        alert(error.message);
      }, () => {
        this._router.navigate(['/dashboard'])
      });
    }
  }

  storeJwtToken(token) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('isAuthorized', 'true');
  }
  
  generateBodyForLogin(data) {
    const body = {};
    body["email"] = data.email;
    body["password"] = data.password;
    return body;
  }

}
