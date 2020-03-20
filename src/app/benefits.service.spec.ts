import { TestBed } from '@angular/core/testing';

import { BenefitsService } from './benefits.service';

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
});
