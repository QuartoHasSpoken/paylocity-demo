import { Injectable } from '@angular/core';
import {Dependent, Employee} from './employee.service';
import {environment} from '../environments/environment';

import {filter} from 'lodash';

interface Discount {
  type: string;
  param: string;
  unit: 'pct' | 'flat';
  val: number;
}

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {
  benefitsPerYearEE = environment.benefitsPerYearEE;
  benefitsPerYearDE = environment.benefitsPerYearDE;
  discounts = environment.benefitDiscounts;



  constructor() { }

  calculate(employees: Array<Employee>): number {
    let total = 0;
    employees.forEach((ee) => {
      total += this.calculateEmployee(ee);
    });
    return total;
  }

  private calculateEmployee(employee: Employee): number {
    let total = 0;
    let depTotal = 0;
    total += this.benefitsPerYearEE;
    total = this.applyEmployeeDiscounts(employee, total);
    employee.dependents.forEach((dep) => {
      depTotal = this.benefitsPerYearDE;
      depTotal = this.applyDependentDiscounts(dep, depTotal);
      total += depTotal;
    });
    return total;
  }

  private applyEmployeeDiscounts(employee: Employee, total: number): number {
    filter(this.discounts, ['type', 'name']).forEach((discount) => {
      total = this.applyNameDiscount(employee.firstName, discount, total);
    });
    return total;
  }

  private applyDependentDiscounts(dependent: string, total: number): number {
    filter(this.discounts, ['type', 'name']).forEach((discount) => {
      total = this.applyNameDiscount(dependent, discount, total);
    });
    return total;
  }

  private applyNameDiscount(name: string, discount: Discount, total: number): number {
    if (name[0].toLowerCase() === discount.param.toLowerCase()) {
      return discount.unit === 'pct' ? total * (1 - (discount.val / 100)) : total;
    }
    return total;
  }
}
