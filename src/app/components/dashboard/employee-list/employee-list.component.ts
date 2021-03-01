import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
public employeeList: any;
  constructor(
    private _empService: EmployeeService
  ) { }

  ngOnInit() {
    this._empService.getAllEmployeeDetails().subscribe((res: any) => {
      this.employeeList = res.data;      
    })
  }

}
