import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import {ApiService} from './api.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let apiServiceSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj(
      'ApiService',
      ['get', 'post']
    );
    service = new EmployeeService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
