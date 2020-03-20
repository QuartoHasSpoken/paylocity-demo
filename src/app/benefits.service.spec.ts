import { TestBed } from '@angular/core/testing';

import { BenefitsService } from './benefits.service';
import {Employee} from './employee.service';

describe('BenefitsService', () => {
  let service: BenefitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenefitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply a name discount', () => {
    let total = 100;
    const discount = { type: 'name', param: 'A', unit: 'pct', val: 10 };
    total = service.applyNameDiscount('June', discount, total);
    expect(total).toBe(100);
    total = service.applyNameDiscount('Abigail', discount, total);
    expect(total).toBe(90);
  });

  it('should calculate employee with no dependents no discounts', () => {
      let employee: Employee;
      employee = {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          dependents: []
        };
      const total = service.calculateEmployee(employee);
      expect(total).toBe(1000);
  });

  it('should calculate employee with no dependents name discount', () => {
    let employee: Employee;
    employee = {
      id: 1,
      firstName: 'Abbey',
      lastName: 'Doe',
      dependents: []
    };
    const total = service.calculateEmployee(employee);
    expect(total).toBe(900);
  });

  it('should calculate employee with 1 dependent no discounts', () => {
    let employee: Employee;
    employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dependents: ['Mickey']
    };
    const total = service.calculateEmployee(employee);
    expect(total).toBe(1500);
  });

  it('should calculate employee with 1 dependent name discount', () => {
    let employee: Employee;
    employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dependents: ['Abigail']
    };
    let total = service.calculateEmployee(employee);
    expect(total).toBe(1450);
    employee.firstName = 'Amy';
    total = service.calculateEmployee(employee);
    expect(total).toBe(1350);
  });

  it('should calculate employee with multiple dependents mixed discounts', () => {
    let employee: Employee;
    employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dependents: ['Abigail', 'Fran', 'Poppy']
    };
    let total = service.calculateEmployee(employee);
    expect(total).toBe(2450);
    employee.firstName = 'Amy';
    total = service.calculateEmployee(employee);
    expect(total).toBe(2350);
  });
});
