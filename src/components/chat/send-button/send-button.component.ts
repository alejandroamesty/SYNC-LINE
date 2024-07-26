import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-send-button',
  standalone: true,
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss'],
  animations: [
    trigger('scaleAnimation', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'scaled',
        style({
          transform: 'scale(0.9)',
        })
      ),
      transition(
        'normal <=> scaled',
        animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ),
    ]),
  ],
  imports: [IonicModule, CommonModule],
})
export class SendButtonComponent implements OnInit {
  @Input() source: string = 'assets/images/send.png';
  @Output() sendClicked = new EventEmitter<void>();

  animationState: string = 'normal';

  ngOnInit() {}

  send() {
    this.animationState = 'scaled';
    setTimeout(() => {
      this.animationState = 'normal';
      this.sendClicked.emit();
    }, 200);
  }
}
