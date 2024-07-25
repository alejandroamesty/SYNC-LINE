import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
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
export class SignInPage implements OnInit {
	constructor(private router: Router) {}
	email: string = '';
	password: string = '';
	ngOnInit() {}

	navigateToSignUp() {
		this.router.navigate(['sign-up']);
	}

	navigateToStartScreen() {
		this.router.navigate(['start-screen']);
	}

	navigateToForgotPassword() {
		this.router.navigate(['forgot-password']);
	}

	async navigateToHome() {
		await fetch('http://localhost:8000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.email,
				password: this.password
			})
		}).then((response) => {
			if (response.status == 200) {
				response.json().then((data) => {
					localStorage.setItem('token', data.token);
					console.log(data.token);
					this.router.navigate(['main-tab']);
				});
			} else {
				alert('Invalid email or password');
			}
		});
	}

	passwordChange(event: any) {
		this.password = event;
	}

	emailChange(event: any) {
		this.email = event;
	}
}
