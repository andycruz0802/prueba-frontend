import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading$ | async">
      <span class="loader"></span>
    </div>
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  public isLoading$ = this.spinnerService.isLoading$;
  constructor(private readonly spinnerService: SpinnerService) {}
}
