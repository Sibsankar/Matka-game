import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.CookieService.get('auth_key'),
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient, private CookieService: CookieService) { }

  private URL: string = environment.angApiUrl;

  
  getGameDetails(data: any): Observable<any> {
    return this.http.get<any>(this.URL + 'game/play/'+data);
  }

  playGameSingle(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'bidsave', data, this.httpOptions);
  }

  playGamePanna(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'pannabidsave', data, this.httpOptions);
  }

  playGameJodi(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'jodibidsave', data, this.httpOptions);
  }

  playGameCP(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'cpbidsave', data, this.httpOptions);
  }

  showCP(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'cpnumshow', data, this.httpOptions);
  }

  getBidList(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'getbidList', data, this.httpOptions);
  }

  bidDelete(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'game/bid_delete', data, this.httpOptions);
  }

  playnow(data: any): Observable<any> {
    return this.http.post<any>(this.URL + 'playnow', data, this.httpOptions);
  }
}
