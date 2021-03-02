import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
showNavHeaders = new BehaviorSubject(localStorage.getItem('isAuthorized'));
employeeDetails = new BehaviorSubject<any>(null);
  constructor(
    public _http: HttpClient,
    private _utilService: UtilsService
  ) { }

  getAllEmployeeDetails() {
    const url = this._utilService.linkGeneration(
      environment.employeeMgmtService.host,
      environment.employeeMgmtService.port,
      environment.employeeMgmtService.apiPrefix,
      environment.employeeMgmtService.getAllEmployees
    );
    return this._http.get(url).pipe(
      map(res => {
        return res
      })
    )
  }

  registerUser(body) {
    const url = this._utilService.linkGeneration(
      environment.employeeMgmtService.host,
      environment.employeeMgmtService.port,
      environment.employeeMgmtService.apiPrefix,
      environment.employeeMgmtService.register
    );
    return this._http.post(url, body).pipe(
      map(res => {
        return res
      })
    )
  }

  loginUser(body) {
    const url = this._utilService.linkGeneration(
      environment.employeeMgmtService.host,
      environment.employeeMgmtService.port,
      environment.employeeMgmtService.apiPrefix,
      environment.employeeMgmtService.authenticate
    );
    return this._http.post(url, body).pipe(
      map(res => {
        return res
      })
    )
  }


  addEmployees(body) {
    const url = this._utilService.linkGeneration(
      environment.employeeMgmtService.host,
      environment.employeeMgmtService.port,
      environment.employeeMgmtService.apiPrefix,
      environment.employeeMgmtService.addEmployee
    );
    return this._http.post(url, body).pipe(
      map(res => {
        return res
      })
    )
  }

  updateEmployee(body) {
    const url = this._utilService.linkGeneration(
      environment.employeeMgmtService.host,
      environment.employeeMgmtService.port,
      environment.employeeMgmtService.apiPrefix,
      environment.employeeMgmtService.updateEmployee
    );
    return this._http.put(url, body).pipe(
      map(res => {
        return res
      })
    )
  }

  getEmployeeById(id) {
    const url = this._utilService.linkGeneration(
      environment.employeeMgmtService.host,
      environment.employeeMgmtService.port,
      environment.employeeMgmtService.apiPrefix,
      environment.employeeMgmtService.getEmployeeById
    );
    const params = {};
    params['_id'] = id
    return this._http.get(url, {params: params}).pipe(
      map(res => {
        return res
      })
    )
  }

  deleteEmployee(id) {
    const url = this._utilService.linkGeneration(
      environment.employeeMgmtService.host,
      environment.employeeMgmtService.port,
      environment.employeeMgmtService.apiPrefix,
      environment.employeeMgmtService.deleteEmployee
    );
    const params = {};
    params['_id'] = id
    return this._http.delete(url, {params: params}).pipe(
      map(res => {
        return res
      })
    )
  }
  

}
