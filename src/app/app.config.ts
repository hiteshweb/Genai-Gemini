// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),                   // ✅ this is what was missing
    importProvidersFrom(FormsModule)       // ✅ for [(ngModel)] binding
  ]
};
