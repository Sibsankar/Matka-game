



import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GameTimingsService {


 httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.CookieService.get('auth_key'),
      'Access-Control-Allow-Origin': '*'
    })
  };


  constructor(private http: HttpClient, private CookieService: CookieService) { }

  private URL: string = environment.angApiUrl;

  

  
  getGames(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'get-all-games', data, this.httpOptions);

  }

  getMatkaResults(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'get-games-result-by-league', data, this.httpOptions);

  }
  getMatkaResultsByDate(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'get-games-result-by-date', data, this.httpOptions);

  }
 
  
}


