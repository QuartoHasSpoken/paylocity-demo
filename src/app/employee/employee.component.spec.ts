import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import {FormBuilder} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {Observable} from 'rxjs';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  let employeeServiceStub: Partial<EmployeeService>;
  employeeServiceStub = {
    getEmployees: () => {
      return new Observable<[]>();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeComponent ],
      providers: [
        FormBuilder,
        {provide: EmployeeService, useValue: employeeServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
