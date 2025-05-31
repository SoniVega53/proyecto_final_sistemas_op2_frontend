import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../service/auth-api.service';
import { UserApiService } from '../service/user-api.service';

export const AuthGuardRolService: CanActivateFn = (route, state) => {
  const authService = inject(UserApiService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data?.['roles'] ?? [];

  const isLoggedIn = authService.isAuthenticated();
  const userRole = authService.getData()?.rol; // Asumimos que tienes este método

  if (isLoggedIn && expectedRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
