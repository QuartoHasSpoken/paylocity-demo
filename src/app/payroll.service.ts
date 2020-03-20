import { Injectable } from '@angular/core';
import {Employee} from './employee.service';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  payRate = environment.payRate;
  payPeriods = environment.payPeriods;

  constructor() { }

  calculate(employees: Array<Employee>) {
    return employees.length * this.payRate * this.payPeriods;
  }
}
