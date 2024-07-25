import {
	Component,
	OnInit,
	ViewChildren,
	QueryList,
	ElementRef,
	Output,
	EventEmitter
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
	animate,
	AnimationBuilder,
	AnimationFactory,
	AnimationPlayer,
	style
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { EnsureFormControlPipe } from './ensure-form-control.pipe';

@Component({
	selector: 'app-verification-input',
	standalone: true,
	templateUrl: './verification-input.component.html',
	styleUrls: ['./verification-input.component.scss'],
	imports: [CommonModule, ReactiveFormsModule, EnsureFormControlPipe]
})
export class VerificationInputComponent implements OnInit {
	code: string[] = ['', '', '', '', '', ''];
	form: FormGroup;
	private players: AnimationPlayer[] = [];
	@Output() codeChange: EventEmitter<string> = new EventEmitter<string>();
	@ViewChildren('input') inputs!: QueryList<ElementRef>;

	constructor(private animationBuilder: AnimationBuilder) {
		this.form = new FormGroup({
			digit0: new FormControl(''),
			digit1: new FormControl(''),
			digit2: new FormControl(''),
			digit3: new FormControl(''),
			digit4: new FormControl(''),
			digit5: new FormControl('')
		});
	}

	ngOnInit() {
		this.form.valueChanges.subscribe((value) => {
			const codeArray = Object.values(value) as string[];
			this.code = codeArray;
			this.onChange(this.code.join(''));
		});
	}

	onChange(code: string) {
		this.codeChange.emit(code);
	}

	handleChangeText(event: any, index: number) {
		const text = event.target.value;
		if (text.length === 1) {
			this.triggerAnimation(index, 1.2, 150);
		}
	}

	handleKeyPress(event: any, index: number) {
		if (event.key === 'Backspace') {
			event.preventDefault();

			this.form.get(`digit${index}`)?.setValue('');

			setTimeout(() => {
				if (index > 0) {
					this.inputs.toArray()[index - 1].nativeElement.focus();
					this.triggerAnimation(index - 1, 0.8, 150);
				}
			});
		} else if (event.key.length === 1) {
			const nextIndex = index;
			if (nextIndex < this.code.length) {
				this.inputs.toArray()[nextIndex].nativeElement.focus();
			}
		}
	}

	private triggerAnimation(index: number, scale: number, duration: number) {
		if (this.players[index]) {
			this.players[index].destroy();
		}

		const factory: AnimationFactory = this.animationBuilder.build([
			style({ transform: 'scale(1)' }),
			animate(`${duration}ms ease`, style({ transform: `scale(${scale})` })),
			animate(`${duration}ms ease`, style({ transform: 'scale(1)' }))
		]);

		const player: AnimationPlayer = factory.create(this.inputs.toArray()[index].nativeElement);
		this.players[index] = player;
		player.play();
	}
}
