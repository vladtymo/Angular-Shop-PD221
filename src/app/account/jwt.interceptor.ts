import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // ... additional logic ...

  const service = inject(TokenService);
  const router = inject(Router);
  const token = service.getAccessToken();
  const snackBar = inject(MatSnackBar);

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error && error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            // TODO: check RefreshToken
            router.navigate(['/login']);
            break;

          default:
            openSnackBar("Something went wrong!", 4);
            break;
        }

      }
      throw throwError(() => error);
    }));

  function openSnackBar(message: string, durationInM: number) {
    snackBar.open(message, undefined, {
      duration: durationInM * 1000,
    });
  }
};

