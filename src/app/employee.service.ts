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

  getEmployee(id: number) {
    return this.apiService.get(this.root, id);
  }

  createEmployee(body) {
    return this.apiService.post(this.root, body);
  }

  deleteEmployee(id: number) {
    return this.apiService.delete(this.root, id);
  }

}
