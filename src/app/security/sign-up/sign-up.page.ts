import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.page.html',
	styleUrls: ['./sign-up.page.scss'],
	standalone: true,
	imports: [
		IonButton,
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		BorderInputComponent,
		SaveButtonComponent,
		ControlButtonComponent
	]
})
export class SignUpPage implements OnInit {
	constructor(private router: Router) {}
	email: string = '';
	password: string = '';
	confirmPassword: string = '';
	fetching: boolean = false;
	ngOnInit() {}

	navigateToSignIn() {
		this.router.navigate(['sign-in']);
	}

	navigateToStartScreen() {
		this.router.navigate(['start-screen']);
	}

	navigateToForgotPassword() {
		this.router.navigate(['forgot-password']);
	}

	handleEmailChange(event: any) {
		this.email = event;
	}

	handlePasswordChange(event: any) {
		this.password = event;
	}

	handleConfirmPasswordChange(event: any) {
		this.confirmPassword = event;
	}

	navigateToHome() {
		this.router.navigate(['main-tab']);
	}
}
