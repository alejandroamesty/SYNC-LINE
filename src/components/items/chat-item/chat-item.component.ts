import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-chat-item',
	templateUrl: './chat-item.component.html',
	styleUrls: ['./chat-item.component.scss'],
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
	standalone: true,
	imports: [CommonModule]
})
export class ChatItemComponent {
	@Input() id!: string;
	@Input() name!: string;
	@Input() preview!: string;
	@Input() time!: string;
	@Input() icon!: string;
	@Output() onPress: EventEmitter<any> = new EventEmitter<any>();

	animationState: string = 'normal';

	handleClick() {
		this.animationState = 'scaled';
		setTimeout(() => {
			this.animationState = 'normal';
			this.onPress.emit({ id: this.id, icon: this.icon });
		}, 200);
	}
}
