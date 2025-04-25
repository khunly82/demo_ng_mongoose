import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '../services/session.service';

export const loggedGuard: CanActivateFn = async (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);
  if(session.dresseur())
    return true;
  await router.navigate(['/login']);
  return false;
};
