import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import Nora from '@primeng/themes/nora';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PokemonService} from './services/pokemon.service';
import {DialogService} from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Nora
      }
    }),
    provideAnimations(),
    provideHttpClient(),
    MessageService,
    ConfirmationService,
    DialogService,
  ]
};
