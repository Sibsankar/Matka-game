import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MatkaGameService {

  constructor(private http: HttpClient) { }

  private URL: string = environment.angApiUrl;

  getAllLeagues(): Observable<any> {
    return this.http.get<any>(this.URL + 'get-leagues');

  }
}
