import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RoundButtonComponent } from 'src/components/buttons/round-button/round-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.page.html',
  styleUrls: ['./start-screen.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RoundButtonComponent]
})
export class StartScreenPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToSignIn() {
    this.router.navigate(['sign-in']);
  }

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }
}
