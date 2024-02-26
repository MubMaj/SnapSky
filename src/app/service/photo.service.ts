import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient
    ) { }

    getPhotoData(city: string): Observable<any>{
      const headers = new HttpHeaders({
        'Authorization': environment.PhotoApiKey as string,
      })
      const options = {headers};
      const url = "https://api.pexels.com/v1/search?query="+city+"&per_page=5";
      return this.http.get<any>(url, options)
    }
}
