import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval, } from 'rxjs';
import { WeatherService } from '../service/weather.service';
import { PhotoService } from '../service/photo.service';
import { BackgroundService } from '../service/background.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm: FormGroup = this.fb.group({
    city: [null, Validators.required],
  });

  weatherData: any = { location: { name: "No Man's Land" }, current: { temp_c: '21' } };
  PhotoData: any[] = [{ src: { landscape: './assets/img/temp.jpg' } }];
  private photoSubscription: Subscription = new Subscription();

  constructor(
    private service: WeatherService,
    private service2: PhotoService,
    private BgService: BackgroundService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.getLocationAndFetchWeather();

    this.photoSubscription = interval(3000).subscribe(() => {
      if (this.PhotoData?.length) {
        const randomIndex = Math.floor(Math.random() * this.PhotoData.length);
        const backgroundImage = `url("${this.PhotoData[randomIndex]?.src?.landscape}")`;
        this.BgService.updateBackgroundImage(backgroundImage);
      }
    });
  }

  ngOnDestroy() {
    this.photoSubscription.unsubscribe();
  }

  getLocationAndFetchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const locationString = `${latitude},${longitude}`;

          this.fetchWeatherData(locationString);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  fetchWeatherData(location: string) {

    this.service.getWeatherData(location).subscribe(
      (res) => {
        this.weatherData = res;
        console.log(this.weatherData);
        const city = this.weatherData.location.name

        this.service2.getPhotoData(city).subscribe((res) => {
          this.PhotoData = res.photos || [];
    
          if (this.PhotoData?.length) {
            const backgroundImage = `url("${this.PhotoData[0]?.src?.landscape}")`;
            this.BgService.updateBackgroundImage(backgroundImage);
          }
        });    
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );

    }

  searchWeather() {
    const city = this.searchForm.get('city')?.value;

    this.service.getWeatherData(city).subscribe(
      (res) => {
        this.weatherData = res;
        
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );

    this.service2.getPhotoData(city).subscribe((res) => {
      this.PhotoData = res.photos || [];

      if (this.PhotoData?.length) {
        const backgroundImage = `url("${this.PhotoData[0]?.src?.landscape}")`;
        this.BgService.updateBackgroundImage(backgroundImage);
      }
    });
  }
}