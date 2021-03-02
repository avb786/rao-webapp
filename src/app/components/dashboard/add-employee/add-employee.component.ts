import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  myReactiveForm: FormGroup;
  employeeData:any;
  toUpdate: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _empService: EmployeeService
  ) { }

  async ngOnInit() {
    if(await sessionStorage.getItem('emp_id')) {
      await this._empService.getEmployeeById(await sessionStorage.getItem('emp_id')).subscribe(async (res: any) => {
        if(res) {
          this.setFormData(res.data[0]);
          this.toUpdate = true;
        }       
      })
    } else {
      this.setFormData('');
      this.toUpdate = false;
    }
 
  }
  setFormData(data?) {
    this.myReactiveForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      branchState: [data.branchState, [Validators.required]],
      employeeVerified: [data.employeeVerified ? true : false],
      dateOfJoining: [data.dateOfJoining ? new Date(data.dateOfJoining).toISOString().slice(0, 16) : '', [Validators.required]],
      zipCode: [data.zipCode, [Validators.required]]
    }); 
  }
  
  async onSubmit() {
    if (this.myReactiveForm.valid && !this.toUpdate) {
      const body = this.generateBodyForaddEmployee(this.myReactiveForm.value);
      this._empService.addEmployees(body).subscribe((res: any) => {
        alert(res.message);
      }, (error) => {
        alert(error.error.message);
      }, () => {
        this._router.navigate(['/dashboard/employee-list'])
      });
    }

    if(this.myReactiveForm.valid && this.toUpdate) {
      const body = this.myReactiveForm.value;
      body._id = await sessionStorage.getItem('emp_id');
      this._empService.updateEmployee(body).subscribe((res:any) => {
        if(res) {
          alert(res.message);
          this._router.navigate(['/dashboard'])
        } 
      }, err => {
        alert(err.error.message);
      })
    }
  }

  

  generateBodyForaddEmployee(data) {
    const body = {};
    body["firstName"] = data.firstName;
    body["lastName"] = data.lastName;
    body["email"] = data.email;
    body["branchState"] = data.branchState;
    body["employeeVerified"] = data.employeeVerified;
    body["dateOfJoining"] = data.dateOfJoining;
    body["zipCode"] = data.zipCode;
    return body;
}

ngOnDestroy() {
  if(sessionStorage.getItem('emp_id')) {
    sessionStorage.removeItem('emp_id')
  }
}

  

}
