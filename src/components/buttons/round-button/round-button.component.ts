import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-round-button',
  standalone: true,
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.scss'],
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
      transition('normal <=> scaled', animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
  ],
})
export class RoundButtonComponent implements OnInit {
  @Input() caption: string = 'Sign up';
  @Input() color: string = '#292B2E';
  @Output() onPress = new EventEmitter<void>();

  animationState: string = 'normal';

  handleClick() {
    this.animationState = 'scaled';
    setTimeout(() => {
      this.animationState = 'normal';
      this.onPress.emit();
    }, 200);
  }

  ngOnInit() {}
}
