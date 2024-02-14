

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.CookieService.get('auth_key'),
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient, private CookieService: CookieService) { }


  private URL: string = environment.angApiUrl;

  updateAccountDetails(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'update-account', data, this.httpOptions);

  }

  getAccountDetails(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'getAccountDetails', data, this.httpOptions);

  }

  updatePasswordDetails(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'password-change', data, this.httpOptions);

  }
}

