import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'start-screen',
		loadComponent: () =>
			import('./security/start-screen/start-screen.page').then((m) => m.StartScreenPage)
	},
	{
		path: '',
		redirectTo: 'start-screen',
		pathMatch: 'full'
	},
	{
		path: 'sign-in',
		loadComponent: () => import('./security/sign-in/sign-in.page').then((m) => m.SignInPage)
	},
	{
		path: 'sign-up',
		loadComponent: () => import('./security/sign-up/sign-up.page').then((m) => m.SignUpPage)
	},
	{
		path: 'sign-up-user',
		loadComponent: () =>
			import('./security/sign-up-user/sign-up-user.component').then(
				(m) => m.SignUpUserComponent
			)
	},
	{
		path: 'forgot-password',
		loadComponent: () =>
			import('./security/forgot-password/forgot-password.page').then(
				(m) => m.ForgotPasswordPage
			)
	},
	{
		path: 'verify-code',
		loadComponent: () =>
			import('./security/forgot-password/verify-code/verify-code.page').then(
				(m) => m.VerifyCodePage
			)
	},
	{
		path: 'reset-password',
		loadComponent: () =>
			import('./security/forgot-password/reset-password/reset-password.page').then(
				(m) => m.ResetPasswordPage
			)
	},
	{
		path: 'chats',
		loadComponent: () => import('./home/chats/chats.page').then((m) => m.ChatsPage)
	},
	{
		path: 'updates',
		loadComponent: () => import('./home/updates/updates.page').then((m) => m.UpdatesPage)
	},
	{
		path: 'contacts',
		loadComponent: () => import('./home/contacts/contacts.page').then((m) => m.ContactsPage)
	},
	{
		path: 'profile',
		loadComponent: () => import('./home/profile/profile.page').then((m) => m.ProfilePage)
	},
	{
		path: 'edit-account',
		loadComponent: () =>
			import('./home/profile/edit-account/edit-account.page').then((m) => m.EditAccountPage)
	},
	{
		path: 'main-tab',
		loadComponent: () => import('./home/main-tab/main-tab.page').then((m) => m.MainTabPage)
	},
	{
		path: 'chat',
		loadComponent: () => import('./home/chats/chat/chat.page').then((m) => m.ChatPage)
	},
	{
		path: 'status',
		loadComponent: () => import('./home/updates/status/status.page').then((m) => m.StatusPage)
	},
	{
		path: 'status',
		loadComponent: () => import('./home/updates/status/status.page').then((m) => m.StatusPage)
	},
  {
    path: 'change-password',
    loadComponent: () => import('./home/profile/change-password/change-password.page').then( m => m.ChangePasswordPage)
  }
];
