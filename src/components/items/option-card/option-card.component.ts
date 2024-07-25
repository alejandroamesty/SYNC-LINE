import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-option-card',
	standalone: true,
	templateUrl: './option-card.component.html',
	styleUrls: ['./option-card.component.scss'],
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
			transition('normal <=> scaled', animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
		])
	]
})
export class OptionCardComponent {
	@Input() source?: string;
	@Input() title?: string;
	@Output() onPress: EventEmitter<void> = new EventEmitter<void>();

	animationState: string = 'normal';

	handleClick() {
		this.animationState = 'scaled';
		setTimeout(() => {
			this.animationState = 'normal';
			this.onPress.emit();
		}, 200);
	}
}
