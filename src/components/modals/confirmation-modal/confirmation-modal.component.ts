import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-confirmation-modal',
	standalone: true,
	templateUrl: './confirmation-modal.component.html',
	styleUrls: ['./confirmation-modal.component.scss'],
	imports: [CommonModule],
	animations: [
		trigger('modalAnimation', [
			state('void', style({ transform: 'scale(0.8)', opacity: 0 })),
			state('enter', style({ transform: 'scale(1)', opacity: 1 })),
			state('leave', style({ transform: 'scale(0.8)', opacity: 0 })),
			transition('* <=> *', animate('200ms ease-in-out'))
		])
	]
})
export class ConfirmationModalComponent {
	@Input() visible: boolean = false;
	@Input() image?: string;
	@Input() title?: string;
	@Input() text?: string;
	@Input() cancelButtonText?: string;
	@Input() acceptButtonText?: string;
	@Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
	@Output() onAccept: EventEmitter<void> = new EventEmitter<void>();

	constructor() {}

	handleCancel() {
		this.onCancel.emit();
	}

	handleAccept() {
		this.onAccept.emit();
	}
}
