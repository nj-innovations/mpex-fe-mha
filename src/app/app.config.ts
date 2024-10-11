import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { authErrorInterceptor } from './core/auth-error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuardService } from './core/auth-guard.service';

export const appConfig: ApplicationConfig = {
	providers: [
		AuthGuardService,
		provideRouter(routes),
		provideHttpClient(
			withInterceptors([authErrorInterceptor])
		), provideAnimationsAsync()
	]
};
