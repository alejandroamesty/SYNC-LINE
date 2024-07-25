import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-simple-button',
	standalone: true,
	templateUrl: './simple-button.component.html',
	styleUrls: ['./simple-button.component.scss'],
	imports: [CommonModule],
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
export class SimpleButtonComponent {
	@Input() caption: string = 'Button';
	@Input() source: string = '';
	@Output() onPress = new EventEmitter<void>();

	animationState: string = 'normal';

	handleClick() {
		this.animationState = 'scaled';
		setTimeout(() => {
			this.animationState = 'normal';
			this.onPress.emit();
		}, 200);
	}
}
