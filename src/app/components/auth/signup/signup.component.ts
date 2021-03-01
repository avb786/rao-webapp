import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myReactiveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );    
  }
  onSubmit() {
    console.log("myReactiveForm", this.myReactiveForm);
    
    if (this.myReactiveForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.myReactiveForm.value);
    this._router.navigate(['/'])
    }
  }
}
