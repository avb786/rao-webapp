import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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

}
