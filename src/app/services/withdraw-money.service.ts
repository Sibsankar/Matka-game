
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WithdrawMoneyService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.CookieService.get('auth_key'),
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient, private CookieService: CookieService) { }


  private URL: string = environment.angApiUrl;

  sendMoneyWidthdrawalRequest(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'sendMoneyWidthdrawalRequest', data, this.httpOptions);

  }
}
