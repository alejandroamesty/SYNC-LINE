import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonContent } from '@ionic/angular/standalone';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [IonContent, CommonModule, IonIcon],
})
export class NavBarComponent {
  activeIndex: number = 0;
  isVisible: boolean = true;

  @Output() tabChanged = new EventEmitter<number>();

  setActive(index: number) {
    Haptics.impact({ style: ImpactStyle.Light });
    this.activeIndex = index;
    this.tabChanged.emit(this.activeIndex);
  }
}
