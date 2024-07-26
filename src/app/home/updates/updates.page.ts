import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StatusItemComponent } from 'src/components/items/status-item/status-item.component';
import { SpecialInputComponent } from 'src/components/inputs/special-input/special-input.component';
import { MyStatusItemComponent } from 'src/components/items/my-status-item/my-status-item.component';

@Component({
	selector: 'app-updates',
	templateUrl: './updates.page.html',
	styleUrls: ['./updates.page.scss'],
	standalone: true,
	imports: [
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		StatusItemComponent,
		SpecialInputComponent,
		MyStatusItemComponent
	]
})
export class UpdatesPage implements OnInit {
	@Output() scrollUp = new EventEmitter<void>();
	@Output() scrollDown = new EventEmitter<void>();

	userStatus = {
		id: '10',
		nombre: 'Alejandro Ávila',
		time: 'Add to status',
		viewed: false
	};

	recentStatus = [
		{ id: '1', nombre: 'Prof. Genyelbert', time: '16m ago', viewed: false },
		{ id: '3', nombre: 'Dr. Martinez', time: '3h ago', viewed: false },
		{ id: '5', nombre: 'Prof. Mario', time: '1d ago', viewed: false }
	];

	viewedStatus = [
		{ id: '2', nombre: 'Alejandro Ávila', time: '16m ago', viewed: true },
		{ id: '4', nombre: 'José Chacón', time: '3h ago', viewed: true },
		{ id: '6', nombre: 'Prof. Jubert', time: '1d ago', viewed: true }
	];

	filteredRecentStatus = [...this.recentStatus];
	filteredViewedStatus = [...this.viewedStatus];

	searchValue: string = '';

	constructor(private router: Router) {}

	ngOnInit() {}

	onScroll(event: CustomEvent): void {
		if (event.detail.deltaY > 0) {
			this.scrollDown.emit();
		} else {
			this.scrollUp.emit();
		}
	}

	handleStatusPress(id: string) {
		console.log('Status item pressed:', id);
		this.router.navigate(['status']);
	}

	handleInputValue(value: string): void {
		this.searchValue = value;
		this.filterStatuses();
	}

	private filterStatuses(): void {
		const search = this.searchValue.toLowerCase();

		this.filteredRecentStatus = this.recentStatus.filter((status) =>
			status.nombre.toLowerCase().includes(search)
		);

		this.filteredViewedStatus = this.viewedStatus.filter((status) =>
			status.nombre.toLowerCase().includes(search)
		);
	}
}
