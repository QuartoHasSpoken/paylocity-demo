import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Employee, EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Array<Employee> = [];

  @Output() onEmployeesUpdate = new EventEmitter<Array<Employee>>();

  employeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dependents: this.fb.array([])
  });

  get dependents() {
    return this.employeeForm.get('dependents') as FormArray;
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.controls);
      this.employeeService.createEmployee(this.employeeForm.value)
        .subscribe((data: Employee) => {
          this.employees.push(data);
          this.resetForm();
          this.onEmployeesUpdate.emit(this.employees);
        });
    } else {
      console.log('Invalid Employee');
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.employeeForm.setControl('dependents', this.fb.array([]));
  }

  addDependent() {
    this.dependents.push(this.fb.control('', Validators.required));
  }

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees()
      .subscribe((data: Employee[]) => {
        this.employees = data;
        this.onEmployeesUpdate.emit(this.employees);
      });
  }

}
