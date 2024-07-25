import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-search-input',
	standalone: true,
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements AfterViewInit {
	@Input() width: string = '291px';
	@Input() backgroundColor: string = '#363636';
	@Input() placeholder: string = 'Search...';
	@Input() focusInput: boolean = false;
	@Output() searchTermChanged: EventEmitter<string> = new EventEmitter<string>();

	constructor(private elementRef: ElementRef) {}

	ngAfterViewInit() {
		if (this.focusInput) {
			const inputElement = this.elementRef.nativeElement.querySelector('.search-input');
			inputElement.focus();
		}
	}

	onInputChange(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		this.searchTermChanged.emit(inputElement.value);
	}
}
