import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';

@Component({
	selector: 'app-my-status-item',
	standalone: true,
	templateUrl: './my-status-item.component.html',
	styleUrls: ['./my-status-item.component.scss'],
	imports: [IonicModule, CommonModule, ControlButtonComponent],
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
export class MyStatusItemComponent {
	@Input() id: string = 'unknownId';
	@Input() nombre: string = 'Default Name';
	@Input() time: string = '0m ago';
	@Input() viewed: boolean = false;
	@Output() onPress = new EventEmitter<string>();

	handlePress() {
		this.onPress.emit(this.id);
	}

	animationState: string = 'normal';

	handleClick() {
		this.animationState = 'scaled';
		setTimeout(() => {
			this.animationState = 'normal';
			this.onPress.emit(this.id);
		}, 200);
	}
}
