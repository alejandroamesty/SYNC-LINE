import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-double-step-modal',
	standalone: true,
	templateUrl: './double-step-modal.component.html',
	styleUrls: ['./double-step-modal.component.scss'],
	imports: [CommonModule]
})
export class DoubleStepModalComponent {
	@Input() visible: boolean = false;
	@Input() title: string = '';
	@Input() cancelButtonName: string = 'Cancel';
	@Input() cancelButtonColor: string = '#F74040';
	@Input() doneButtonColor: string = '#33BE99';
	@Input() stepOneContent!: TemplateRef<any>;
	@Input() stepTwoContent!: TemplateRef<any>;

	@Output() visibilityChange = new EventEmitter<boolean>();
	@Output() doneAction = new EventEmitter<void>();

	currentStep: number = 1;

	closeModal() {
		this.visible = false;
		this.visibilityChange.emit(this.visible);
		this.resetSteps();
	}

	onCancel() {
		this.closeModal();
	}

	onDone() {
		this.doneAction.emit();
		this.closeModal();
	}

	nextStep() {
		if (this.currentStep < 2) {
			this.currentStep++;
		}
	}

	previousStep() {
		if (this.currentStep > 1) {
			this.currentStep--;
		}
	}

	resetSteps() {
		this.currentStep = 1;
	}
}
