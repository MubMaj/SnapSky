import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {    
  }
  
  getWeatherData(city: string): Observable<any> {
    const headers = new HttpHeaders()
    .set(environment.weatherAPIKeyLabel, environment.weatherAPIKey)
    .set(environment.weatherAPIHostLable, environment.weatherAPIHostKey);
    
    const params = new HttpParams().set('q', city);
    
    const options = { headers, params };
    
   return this.http.get(environment.weatherApiURL, options);
  }
}
