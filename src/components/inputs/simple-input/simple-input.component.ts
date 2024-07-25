import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-simple-input',
	templateUrl: './simple-input.component.html',
	styleUrls: ['./simple-input.component.scss'],
	standalone: true,
	imports: [CommonModule]
})
export class SimpleInputComponent {
	@Input() placeholder: string = '';
	@Input() defaultValue: string = '';
	@Input() style: any = {};
	@Input() image: string = '';
	@Input() width: number = 360;
	@Input() height: number = 40;
	@Input() fontSize: number = 15;
	@Input() borderRadius: number = 18;
	@Input() characterLimit?: number;
	@Output() onChangeText: EventEmitter<string> = new EventEmitter<string>();

	value: string = '';
	errorMessage: string = '';

	inputStyles: { [key: string]: string } = {};
	containerStyles: { [key: string]: string } = {};

	ngOnInit() {
		this.value = this.defaultValue;
		this.calculateStyles();
	}

	calculateStyles() {
		this.containerStyles = {
			width: `${this.width}px`,
			height: `${this.height}px`,
			borderRadius: `${this.borderRadius}px`,
			...this.style
		};

		this.inputStyles = {
			fontSize: `${this.fontSize}px`,
			paddingRight: this.image ? '16px' : '',
			paddingTop: this.height > 40 ? '16px' : ''
		};
	}

	handleChange(event: any) {
		const text = event.target.value;
		if (this.characterLimit && text.length > this.characterLimit) {
			this.errorMessage = `Character limit exceeded. Maximum ${this.characterLimit} characters allowed.`;
		} else {
			this.errorMessage = '';
			this.value = text;
			this.onChangeText.emit(text);
		}
	}
}
