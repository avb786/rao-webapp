import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
public employeeList: any;
  constructor(
    private _empService: EmployeeService,
    private _route: Router
  ) { }

  ngOnInit() {
    this._empService.getAllEmployeeDetails().subscribe((res: any) => {
      this.employeeList = res.data;      
    }, error => {
      console.log(error);
      if(error.error.message === "Authentication Failed") {
        setTimeout(() => {
          alert(error.error.message + ' !Redirecting to login page')
          this._route.navigate(['/'])
        }, 3000)
      }
    })
  }

  async updateEmployeeList(id) {
    await sessionStorage.setItem('emp_id', id)
    this._route.navigate(['/dashboard/add-employee'])
  }

  deleteEmployeeList(id) {
    this._empService.deleteEmployee(id).subscribe((res: any) => {
      alert(res.message);
      this._route.navigate(['/dashboard'])
      window.location.reload()
    }, err => {
      alert(err.err.message)
    })
  }

}
