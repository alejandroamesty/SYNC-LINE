import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BorderInputComponent } from './border-input.component';

describe('BorderInputComponent', () => {
	let component: BorderInputComponent;
	let fixture: ComponentFixture<BorderInputComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [BorderInputComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(BorderInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
