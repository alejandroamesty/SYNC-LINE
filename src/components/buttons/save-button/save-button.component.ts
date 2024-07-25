import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-save-button',
	standalone: true,
	templateUrl: './save-button.component.html',
	styleUrls: ['./save-button.component.scss'],
	imports: [CommonModule]
})
export class SaveButtonComponent {
	@Input() title?: string;
	@Input() disabled?: boolean;
	@Input() width?: number;

	@Output() onPress: EventEmitter<void> = new EventEmitter<void>();

	handleClick() {
		if (!this.disabled) {
			this.onPress.emit();
			const button = document.querySelector('.save-button');
			if (button) {
				button.classList.add('clicked');
				setTimeout(() => {
					button.classList.remove('clicked');
				}, 300);
			}
		}
	}
}
