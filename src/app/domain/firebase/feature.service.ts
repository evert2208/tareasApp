import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { getRemoteConfig, fetchAndActivate, getValue, RemoteConfig } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  private remoteConfig: RemoteConfig;

  constructor(private firebaseApp: FirebaseApp) {
    this.remoteConfig = getRemoteConfig(this.firebaseApp);

    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 60000
    };
  }

  enableCategories$(): Observable<boolean> {
    return from(
      fetchAndActivate(this.remoteConfig).then(() => {
        return getValue(this.remoteConfig, 'enable_categories').asBoolean();
      })
    );
  }

   enableDarkMode$(): Observable<boolean> {
    return from(
      fetchAndActivate(this.remoteConfig).then(() => {
        return getValue(this.remoteConfig, 'enableDarkMode').asBoolean();
      })
    );
  }
}
