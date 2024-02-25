import { WeatherService } from './../service/weather.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private service: WeatherService,
  ){}
  
  weatherData: any;

  clickme(){
    this.service.getWeatherData('New Delhi').subscribe((res) => {
      console.log(res);
      this.weatherData = res;
    })
  };

}
