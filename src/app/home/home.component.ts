import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Employee} from '../employee.service';
import {PayrollService} from '../payroll.service';
import {BenefitsService} from '../benefits.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  env = environment;
  employeeCount = 0;
  dependentCount = 0;
  salaryTotal = 0;
  benefitTotal = 0;

  constructor(private payrollService: PayrollService, private benefitsService: BenefitsService) { }

  employeesUpdate(employees: Array<Employee>) {
    this.employeeCount = employees.length;
    this.dependentCount = employees.map((ee) => ee.dependents.length).reduce((acc, val) => acc + val, 0);
    this.salaryTotal = this.payrollService.calculate(employees);
    this.benefitTotal = this.benefitsService.calculate(employees);
  }

  ngOnInit(): void {
  }

}
