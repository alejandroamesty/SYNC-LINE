import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-custom-modal',
	standalone: true,
	templateUrl: './custom-modal.component.html',
	styleUrls: ['./custom-modal.component.scss'],
	imports: [CommonModule]
})
export class CustomModalComponent {
	@Input() visible: boolean = false;
	@Input() title: string = '';
	@Input() cancelButtonName: string = 'Cancel';
	@Input() doneButtonName: string = 'Done';
	@Input() cancelButtonAction: () => void = () => {};
	@Input() doneButtonAction: () => void = () => {};
	@Input() cancelButtonColor: string = '#F74040';
	@Input() doneButtonColor: string = '#33BE99';
	@Input() modalContent!: TemplateRef<any>;

	@Output() visibilityChange = new EventEmitter<boolean>();

	closeModal() {
		this.visible = false;
		this.visibilityChange.emit(this.visible);
	}

	onCancel() {
		this.cancelButtonAction();
		this.closeModal();
	}

	onDone() {
		this.doneButtonAction();
		this.closeModal();
	}
}
