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
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';

@Component({
	selector: 'app-contact-item',
	standalone: true,
	templateUrl: './contact-item.component.html',
	styleUrls: ['./contact-item.component.scss'],
	imports: [IonicModule, CommonModule, ControlButtonComponent]
})
export class ContactItemComponent implements AfterViewInit {
	@Input() id: string = 'unknownId';
	@Input() name: string = 'Default Name';
	@Input() username: string = 'username';
	@Input() profilePicture: string = 'assets/images/IMG_2751.png';
	@Output() onDelete = new EventEmitter<string>();
	@Output() onAddToGroup = new EventEmitter<string>();
	@Output() onViewChat = new EventEmitter<string>();

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
				if (ev.deltaX > 0) {
					this.wrapper.nativeElement.style['background-color'] = '#72CAAF';
					this.showIcon('add');
					style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
				} else if (ev.deltaX < 0) {
					this.wrapper.nativeElement.style['background-color'] = '#F4385A';
					this.showIcon('delete');
					style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
				}
			},
			onEnd: (ev) => {
				style.transition = '0.2s ease-out';

				if (ev.deltaX > 70) {
					style.transform = `translate3d(${windowWidth}px, 0, 0)`;
					this.onAddToGroup.emit(this.id);
					this.resetPosition();
				} else if (ev.deltaX < -70) {
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
		const addIcon = this.wrapper.nativeElement.querySelector('.add-icon');
		const deleteIcon = this.wrapper.nativeElement.querySelector('.delete-icon');
		if (type === 'add') {
			addIcon.style.display = 'flex';
			deleteIcon.style.display = 'none';
		} else if (type === 'delete') {
			addIcon.style.display = 'none';
			deleteIcon.style.display = 'flex';
		} else {
			addIcon.style.display = 'none';
			deleteIcon.style.display = 'none';
		}
	}

	resetPosition() {
		setTimeout(() => {
			const style = this.item.nativeElement.style;
			style.transform = '';
		}, 300);
	}

	onViewChatClick() {
		this.onViewChat.emit(this.id);
	}
}
