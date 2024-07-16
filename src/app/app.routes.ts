import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'start-screen',
    loadComponent: () => import('./security/start-screen/start-screen.page').then((m) => m.StartScreenPage),
  },
  {
    path: '',
    redirectTo: 'start-screen',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./security/sign-in/sign-in.page').then( m => m.SignInPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./security/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./security/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'verify-code',
    loadComponent: () => import('./security/forgot-password/verify-code/verify-code.page').then( m => m.VerifyCodePage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./security/forgot-password/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'edit-account',
    loadComponent: () => import('./home/profile/edit-account/edit-account.page').then( m => m.EditAccountPage)
  },
];
