import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
	let clonedRequest = null;
	const sessionStorage = inject(LocalStorageService);
	const router = inject(Router);
	const bt = sessionStorage.getToken();
	if(bt !== '') {
		clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + bt) });
	} else {
		clonedRequest = req.clone();
	}
	return next(clonedRequest).pipe(
		catchError((err: any) => {
		  if (err instanceof HttpErrorResponse) {
			switch(err.status){
				case 401:
					if(!clonedRequest.url.includes('auth/login')){
						router.navigate(
							['/'],
							{ queryParams: { msg: 4}}
						);
					}
					break;
				case 403: 
					router.navigate(['/forbidden']);
					break;
				case 422:
					let errmsg = '';	
					for(const p in err.error.errors){
						for(const s of err.error.errors[p]){
							errmsg += s + ", ";
						}
					}
					err.error.message = errmsg;
					break;
			}
		  } else {
			
			// Handle non-HTTP errors
			console.error('An error occurred:', err);
		  }
	
		  // Re-throw the error to propagate it further
		  return throwError(() => err); 
		})
	  );;
};
