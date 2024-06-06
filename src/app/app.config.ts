import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {MascotState} from "../states/mascot-state.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      NgxsModule.forRoot(
        [MascotState],
        {
          developmentMode: true,
          selectorOptions: {
            suppressErrors: false,
            injectContainerState: false
          }
        }
      ),
    )
  ]
};


