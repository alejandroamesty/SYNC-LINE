import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	AfterViewInit
} from '@angular/core';
import { GestureController, AnimationController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-group-contact-item',
	standalone: true,
	templateUrl: './group-contact-item.component.html',
	styleUrls: ['./group-contact-item.component.scss'],
	imports: [IonicModule, CommonModule]
})
export class GroupContactItemComponent implements AfterViewInit {
	@Input() id: string = 'unknownId';
	@Input() username: string = 'username';
	@Input() status: string = 'status';
	@Input() profilePicture: string = 'assets/images/IMG_2751.png';
	@Output() onDelete = new EventEmitter<string>();

	@ViewChild('wrapper', { read: ElementRef })
	wrapper!: ElementRef;
	@ViewChild('item', { read: ElementRef })
	item!: ElementRef;

	constructor(
		private gestureCtrl: GestureController,
		private animationCtrl: AnimationController
	) {}

	ngAfterViewInit() {
		const style = this.item.nativeElement.style;
		const windowWidth = window.innerWidth;

		const moveGesture = this.gestureCtrl.create({
			el: this.item.nativeElement,
			gestureName: 'move',
			threshold: 0,
			onStart: () => {
				style.transition = '';
				this.showIcon('');
			},
			onMove: (ev) => {
				if (ev.deltaX < 0) {
					this.wrapper.nativeElement.style['background-color'] = '#F4385A';
					this.showIcon('delete');
					style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
				}
			},
			onEnd: (ev) => {
				style.transition = '0.2s ease-out';

				if (ev.deltaX < -70) {
					style.transform = `translate3d(-${windowWidth}px, 0, 0)`;
					this.onDelete.emit(this.id);
					this.resetPosition();
				} else {
					style.transform = '';
				}
			}
		});

		moveGesture.enable(true);
	}

	showIcon(type: string) {
		const deleteIcon = this.wrapper.nativeElement.querySelector('.delete-icon');
		if (type === 'delete') {
			deleteIcon.style.display = 'flex';
		} else {
			deleteIcon.style.display = 'none';
		}
	}

	resetPosition() {
		setTimeout(() => {
			const style = this.item.nativeElement.style;
			style.transform = '';
		}, 300);
	}
}
