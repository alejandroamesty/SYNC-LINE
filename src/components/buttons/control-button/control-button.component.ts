import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-control-button',
	standalone: true,
	templateUrl: './control-button.component.html',
	styleUrls: ['./control-button.component.scss'],
	animations: [
		trigger('scaleAnimation', [
			state(
				'normal',
				style({
					transform: 'scale(1)'
				})
			),
			state(
				'scaled',
				style({
					transform: 'scale(0.9)'
				})
			),
			transition('normal <=> scaled', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
		])
	],
	imports: [CommonModule]
})
export class ControlButtonComponent {
	@Input() source?: string;
	@Input() size?: number;

	@Output() onPress: EventEmitter<void> = new EventEmitter<void>();

	animationState: string = 'normal';

	handlePress() {
		this.animationState = 'scaled';
		setTimeout(() => {
			this.animationState = 'normal';
			this.onPress.emit();
		}, 200);
	}
}
