import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeroesService } from 'src/app/shared/services/heroes/heroes.service';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { Hero } from 'src/app/interfaces/hero.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditHeroDialogComponent } from '../create-edit-hero-dialog/create-edit-hero-dialog.component';
import { ActionEnum } from 'src/app/enums/action.enum';
import { FormGroup } from '@angular/forms';
import { RemoveHeroConfirmComponent } from '../remove-hero-confirm/remove-hero-confirm.component';

@Component({
  selector: 'app-heroes-table',
  templateUrl: './heroes-table.component.html',
  styleUrls: ['./heroes-table.component.scss'],
})
export class HeroesTableComponent implements OnInit, AfterViewInit {
  private allHeroes: Hero[] = [];
  public displayedColumns: string[] = [
    'name',
    'age',
    'strong_point',
    'delete',
    'edit',
  ];
  public dataSource!: MatTableDataSource<Hero, MatTableDataSourcePaginator>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.heroesService.getAllHeroes().subscribe((heroes) => {
      this.allHeroes = heroes as Hero[];
      this.dataSource = new MatTableDataSource(this.allHeroes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteHero(hero: Hero) {
    const dialogRef: MatDialogRef<RemoveHeroConfirmComponent> =
      this.dialog.open(RemoveHeroConfirmComponent, {
        data: {
          name: hero.name,
        },
      });

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {
        this.heroesService.deleteHero(hero.id).subscribe(() => {
          this.dataSource.data.splice(
            this.allHeroes.findIndex((hero) => hero.id === hero.id),
            1
          );
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }

  createHero() {
    const dialogRef: MatDialogRef<CreateEditHeroDialogComponent> =
      this.dialog.open(CreateEditHeroDialogComponent, {
        data: {
          action: ActionEnum.create,
        },
        width: '500px',
        height: '500px',
      });

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {
        const newHero: Hero = {
          ...result.getRawValue(),
          id: this.allHeroes[this.allHeroes.length - 1].id + 1,
        };
        this.dataSource.data.push(newHero);
        this.heroesService.addHero(newHero).subscribe();
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  modifyHero(hero: Hero) {
    const dialogRef: MatDialogRef<CreateEditHeroDialogComponent> =
      this.dialog.open(CreateEditHeroDialogComponent, {
        data: {
          hero,
          action: ActionEnum.edit,
        },
        width: '500px',
        height: '500px',
      });

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {
        const newHero: Hero = {
          ...result.getRawValue(),
          id: hero.id,
        };
        const index = this.dataSource.data.findIndex(
          (hero) => hero.id === newHero.id
        );
        this.dataSource.data[index] = {
          ...newHero,
        };
        this.heroesService.modifyHero(newHero.id, newHero).subscribe();
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  filterHeroes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
