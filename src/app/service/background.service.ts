import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  constructor() { }

  private backgroundImageSource = new BehaviorSubject<string>('');
  currentBackgroundImage = this.backgroundImageSource.asObservable();

  updateBackgroundImage(imageUrl: string) {
    this.backgroundImageSource.next(imageUrl);
  }
}
