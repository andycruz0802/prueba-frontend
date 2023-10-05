import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from 'src/app/interfaces/hero.interface';
import { ActionEnum } from 'src/app/enums/action.enum';
import { StrongPoint } from '../../services/heroes/heroes.service';

@Component({
  selector: 'app-create-edit-hero-dialog',
  templateUrl: './create-edit-hero-dialog.component.html',
  styleUrls: ['./create-edit-hero-dialog.component.scss'],
})
export class CreateEditHeroDialogComponent {
  public actionEnum = ActionEnum;

  public options: StrongPoint[] = ['water', 'wind', 'fire', 'magic'];
  public form: FormGroup = this.getForm();

  constructor(
    private dialogRef: MatDialogRef<CreateEditHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hero?: Hero; action: string },
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form);
    }
  }

  strongPointValidator(control: AbstractControl): ValidationErrors | null {
    const selectedValue = control.value;
    if (!this.options.includes(selectedValue)) {
      return { invalidStrongPoint: true };
    }
    return null;
  }

  getForm(): FormGroup {
    return this.fb.group({
      name: [
        this.data?.hero?.name || '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(40),
        ],
      ],
      age: [
        this.data?.hero?.age || null,
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
      strong_point: [
        this.data?.hero?.strong_point || '',
        [Validators.required, this.strongPointValidator.bind(this)],
      ],
    });
  }
}
