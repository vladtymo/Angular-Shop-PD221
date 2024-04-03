import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountsService } from './services/accounts.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const accountService = inject(AccountsService);

  const role = accountService.getCurrentUserRole();

  if (role == "Admin") {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
