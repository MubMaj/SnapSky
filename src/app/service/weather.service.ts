import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';

  constructor(private http: HttpClient) { }
  
  getWeatherData(city: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', '84f113d9edmsh32237af41a99a50p198d9fjsn039e6313c902')
      .set('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com');

    const params = new HttpParams().set('q', city);

    const options = { headers, params };

    return this.http.get(this.apiUrl, options);
  }
}
