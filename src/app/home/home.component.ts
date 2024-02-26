import { BackgroundService } from './../service/background.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './../service/weather.service';
import { Component } from '@angular/core';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  searchForm!: FormGroup;

  constructor(
    private service: WeatherService,
    private service2: PhotoService,
    private BgService: BackgroundService,
    private fb: FormBuilder,
  ){}


  ngOnInit(){
    this.searchForm = this.fb.group({
      city : [null, Validators.required]
    })
  }
  
  weatherData: any;
  PhotoData: any;
  
  searchWeather(){
    console.log(this.searchForm.value);
    this.service.getWeatherData(this.searchForm.get(['city'])!.value).subscribe((res) => {
      console.log(res);
      this.weatherData = res;
    })
    this.service2.getPhotoData(this.searchForm.get(['city'])!.value).subscribe((res) =>{
      console.log(res);
      this.PhotoData = res.photos;
      console.log(this.PhotoData);
      console.log(this.PhotoData[0].src.landscape);

      if (this.PhotoData && this.PhotoData.length > 0) {
        const backgroundImage = `url("${this.PhotoData[0].src.landscape}")`;
        this.BgService.updateBackgroundImage(backgroundImage);
    } 
    })
  };
}
