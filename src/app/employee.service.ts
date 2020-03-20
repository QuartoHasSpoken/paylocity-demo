import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dependents: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private root = 'employees';

  constructor(private apiService: ApiService) { }

  getEmployees() {
    return this.apiService.get(this.root);
  }

  createEmployee(body) {
    return this.apiService.post(this.root, body);
  }

}
