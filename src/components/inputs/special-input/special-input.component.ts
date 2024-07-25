import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-special-input',
	templateUrl: './special-input.component.html',
	styleUrls: ['./special-input.component.scss'],
	standalone: true
})
export class SpecialInputComponent {
	@Input() placeholder: string = '';
	@Output() inputValue: EventEmitter<string> = new EventEmitter<string>();

	onInput(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		this.inputValue.emit(inputElement.value);
	}
}
