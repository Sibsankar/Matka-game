import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
 
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.CookieService.get('auth_key'),
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient, private CookieService: CookieService) { }


  private URL: string = environment.angApiUrl;



  login(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'login', data);

  }
  
  sendOtp(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'sendOTP', data, this.httpOptions);

  }
  register(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'register', data, this.httpOptions);

  }
  Customerlogin(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'Authenticate/login', data);

  }

  getUserDetails(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'getUserDetails', data);

  }

  login2(email: string, password: string) {
    console.log("helllo");
    var isAuthenticate;
    const data = {"email":email,"password":password};
    console.log(this.URL);
    var retData = this.http.post<any>(this.URL + 'Authenticate/login', data);
    console.log(retData);

    if (email === 'admin@gmail.com' && password === 'admin') {
      
      localStorage.setItem('email','admin@gmail.com');
      localStorage.setItem('isAuthenticate','true');
      return true;
    }
    return false;
  }

 
}
