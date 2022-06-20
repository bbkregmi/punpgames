import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

if (environment.production) {
  enableProdMode();
}

const firebaseConfig = {
  apiKey: "AIzaSyBIhSN0UOLjm_mSk9qztwEmCFLcQq7Z1QA",
  authDomain: "punpgames-cda3a.firebaseapp.com",
  projectId: "punpgames-cda3a",
  storageBucket: "punpgames-cda3a.appspot.com",
  messagingSenderId: "329829424402",
  appId: "1:329829424402:web:550373898f10fcef71a7cb",
  measurementId: "G-T9ZMKYVETH",
  databaseURL: "https://punpgames-cda3a-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
