import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { kreditur } from '../../../model/kreditur';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form.html',
    styleUrl: './form.scss',
})
export class FormComponent {
    @Output() addKreditur = new EventEmitter<kreditur>();

    krediturForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(120)]),
        job: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    onSubmit(): void {
        if (!this.krediturForm.valid) return;

        const formValue = this.krediturForm.value;
        const newKreditur: kreditur = {
            name: formValue.name || '',
            age: Number(formValue.age) || 0,
            job: formValue.job || '',
        };

        this.addKreditur.emit(newKreditur);
        this.krediturForm.reset();
    }

    // Helper method untuk template
    isFieldInvalid(fieldName: string): boolean {
        const field = this.krediturForm.get(fieldName);
        return !!(field?.invalid && field?.touched);
    }
}
