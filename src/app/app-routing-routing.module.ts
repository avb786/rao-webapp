import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AddEmployeeComponent } from './components/dashboard/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/dashboard/employee-list/employee-list.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'signup', component: SignupComponent, pathMatch: 'full'},
  { path: 'dashboard', canActivate:[AuthGuard] , component: DashboardComponent, children: [
    { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
    {path: 'add-employee', component: AddEmployeeComponent},
    {path: 'employee-list', component: EmployeeListComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
