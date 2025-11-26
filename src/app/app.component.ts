import { Component } from '@angular/core';
import { FeatureFlagService } from './domain/firebase/feature.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private featureFlag: FeatureFlagService) { this.initTheme();}

   initTheme() {
    this.featureFlag.enableDarkMode$().subscribe(enabled => {
      if(enabled===true){document.body.classList.toggle('dark', true);}
      if(enabled===false){document.body.classList.toggle('bright', true);}

    });
  }
}
