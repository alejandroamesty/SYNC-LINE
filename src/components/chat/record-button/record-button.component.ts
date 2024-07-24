import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-record-button',
  standalone: true,
  templateUrl: './record-button.component.html',
  styleUrls: ['./record-button.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('normal', style({ backgroundColor: 'rgba(79, 84, 88, 0.5)' })),
      state('pressed', style({ backgroundColor: '#F4385A' })),
      transition('normal <=> pressed', animate('300ms ease-in')),
    ]),
  ],
  imports: [IonicModule, CommonModule],
})
export class RecordButtonComponent implements OnInit {
  @Output() recordStart = new EventEmitter<void>();
  @Output() recordStop = new EventEmitter<void>();

  isPressed = false;

  constructor() {}

  ngOnInit() {}

  startRecording() {
    if (!this.isPressed) {
      this.isPressed = true;
      this.recordStart.emit();
    }
  }

  stopRecording() {
    if (this.isPressed) {
      this.isPressed = false;
      this.recordStop.emit();
    }
  }
}
