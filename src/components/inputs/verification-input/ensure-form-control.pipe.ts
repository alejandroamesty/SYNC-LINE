import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Pipe({
	name: 'ensureFormControl',
	standalone: true
})
export class EnsureFormControlPipe implements PipeTransform {
	transform(control: AbstractControl | null): FormControl {
		if (control instanceof FormControl) {
			return control;
		} else {
			return new FormControl();
		}
	}
}
