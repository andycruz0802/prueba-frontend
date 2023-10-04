import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from '../pages/heroes/heroes.component';
import { HeroesTableComponent } from '../shared/components/heroes-table/heroes-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateEditHeroDialogComponent } from '../shared/components/create-edit-hero-dialog/create-edit-hero-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveHeroConfirmComponent } from '../shared/components/remove-hero-confirm/remove-hero-confirm.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIAL_COMPONENTS = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatPaginatorModule,
  MatButtonModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTooltipModule,
];
const APP_COMPONENTS = [
  HeroesTableComponent,
  CreateEditHeroDialogComponent,
  RemoveHeroConfirmComponent,
];
const APP_PAGES = [HeroesComponent];

@NgModule({
  declarations: [...APP_COMPONENTS, ...APP_PAGES],
  imports: [
    CommonModule,
    ...MATERIAL_COMPONENTS,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
