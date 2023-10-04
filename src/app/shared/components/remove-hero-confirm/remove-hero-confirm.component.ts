import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-hero-confirm',
  templateUrl: './remove-hero-confirm.component.html',
  styleUrls: ['./remove-hero-confirm.component.scss'],
})
export class RemoveHeroConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveHeroConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onSubmit(deleteHero: boolean) {
    this.dialogRef.close(deleteHero);
  }
}
