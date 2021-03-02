import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
navbarsData = {
  addEmployee: false,
  isLogin: true,
  isSignup: true,
  isLogout: false
}

  constructor(
    private _empService: EmployeeService,
    private _route: Router
  ) { }

  ngOnInit() {
    this._empService.showNavHeaders.next(sessionStorage.getItem('isAuthorized'))
    this._empService.showNavHeaders.subscribe((res: any) => {
      if(res === 'false') {
        this.navbarsData.isLogin = true;
        this.navbarsData.isSignup = true;

      }
        if(res == 'true') {
        this.navbarsData.isLogin = false;
        this.navbarsData.isSignup = false;
        this.navbarsData.addEmployee = true;
        this.navbarsData.isLogout = true;
        }       
    })
  }

  gotoDashboard() {
    this._route.navigate(['/dashboard'])
  }

  logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('isAuthorized')
    this._route.navigate(['/'])
    this._empService.showNavHeaders.next(sessionStorage.getItem('isAuthorized'))
  }

  gotoaddEmployee() {
    this._route.navigate(['dashboard/add-employee'])
  }

}
