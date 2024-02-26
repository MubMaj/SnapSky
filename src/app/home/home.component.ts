import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { WeatherService } from '../service/weather.service';
import { PhotoService } from '../service/photo.service';
import { BackgroundService } from '../service/background.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  weatherData: any;
  PhotoData: any;
  private photoSubscription!: Subscription;

  constructor(
    private service: WeatherService,
    private service2: PhotoService,
    private BgService: BackgroundService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      city: [null, Validators.required],
    });

    const backgroundUpdateInterval = interval(3000);
    this.photoSubscription = backgroundUpdateInterval.subscribe(() => {
      if (this.PhotoData && this.PhotoData.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.PhotoData.length);
        const backgroundImage = `url("${this.PhotoData[randomIndex].src.landscape}")`;
        this.BgService.updateBackgroundImage(backgroundImage);
      }
    });
  }

  ngOnDestroy() {
    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }
  }

  searchWeather() {
    this.service.getWeatherData(this.searchForm.get(['city'])!.value).subscribe((res) => {
      this.weatherData = res;
    });

    this.service2.getPhotoData(this.searchForm.get(['city'])!.value).subscribe((res) => {
      this.PhotoData = res.photos;

      if (this.PhotoData && this.PhotoData.length > 0) {
        const backgroundImage = `url("${this.PhotoData[0].src.landscape}")`;
        this.BgService.updateBackgroundImage(backgroundImage);
      }
    });
  }
}