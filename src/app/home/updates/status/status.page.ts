import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	OnDestroy,
	Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { Router } from '@angular/router';

interface Status {
	imageUrl: string;
	time: string;
}

@Component({
	selector: 'app-status',
	standalone: true,
	templateUrl: './status.page.html',
	styleUrls: ['./status.page.scss'],
	imports: [CommonModule, ControlButtonComponent]
})
export class StatusPage implements OnInit, OnDestroy {
	@Input() statuses: Status[] = [];
	@Input() userName: string = '';
	@Input() userIcon: string = '';
	@Output() goBack = new EventEmitter<void>();

	currentStatusIndex: number = 0;

	constructor(
		private renderer: Renderer2,
		private _location: Location,
		private router: Router
	) {
		const statuses = router.getCurrentNavigation()?.extras?.state?.['status'];
		this.statuses = statuses || [];
		console.log(this.statuses);
		this.userName = router.getCurrentNavigation()?.extras?.state?.['userName'] || '';
		this.userIcon = router.getCurrentNavigation()?.extras?.state?.['userIcon'] || '';
	}

	ngOnInit() {
		// Añadir la clase de entrada cuando el componente se inicializa
		setTimeout(() => {
			const container = document.querySelector('.status-container');
			const background = document.querySelector('.background-overlay');
			this.renderer.addClass(container, 'enter');
			this.renderer.addClass(background, 'enter');
		}, 0);
	}

	ngOnDestroy() {
		// Añadir la clase de salida cuando el componente se destruye
		const container = document.querySelector('.status-container');
		const background = document.querySelector('.background-overlay');
		this.renderer.removeClass(container, 'enter');
		this.renderer.removeClass(background, 'enter');
		this.renderer.addClass(container, 'leave');
		this.renderer.addClass(background, 'leave');
	}

	nextStatus() {
		if (this.currentStatusIndex < this.statuses.length - 1) {
			this.currentStatusIndex++;
		} else {
			this.onGoBackClick();
		}
	}

	prevStatus() {
		if (this.currentStatusIndex > 0) {
			this.currentStatusIndex--;
		}
	}

	handleScreenClick(event: MouseEvent) {
		const clickPosition = event.clientX;
		const screenWidth = window.innerWidth;

		if (clickPosition < screenWidth / 2) {
			this.prevStatus();
		} else {
			this.nextStatus();
		}
	}

	onGoBackClick() {
		const container = document.querySelector('.status-container');
		const background = document.querySelector('.background-overlay');
		this.renderer.removeClass(container, 'enter');
		this.renderer.removeClass(background, 'enter');
		this.renderer.addClass(container, 'leave');
		this.renderer.addClass(background, 'leave');

		// Retrasar la navegación para permitir que la animación se ejecute
		setTimeout(() => {
			this.goBack.emit();
			this._location.back();
		}, 300); // Debe coincidir con la duración de la animación
	}
}
