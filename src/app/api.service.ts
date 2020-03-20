import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host = environment.apiHost;

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = `Error: ${error.error.message}`;
    } else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;''
    }
    window.alert(msg);
    return throwError(msg);
  }

  get(path, id?) {
    let apiPath = `${this.host}/${path}`;
    apiPath += id ? `/${id}` : '';
    return this.httpClient.get(apiPath).pipe(catchError(this.handleError));
  }

  post(path, body) {
    return this.httpClient.post(`${this.host}/${path}`, body).pipe(catchError(this.handleError));
  }

  delete(path, id) {
    const apiPath = `${this.host}/${path}/${id}`;
    return this.httpClient.delete(apiPath).pipe(catchError(this.handleError));
  }
}
