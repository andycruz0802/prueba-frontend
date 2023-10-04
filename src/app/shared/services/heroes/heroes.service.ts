import { Injectable } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL_BASE = `http://localhost:3000/heroes/`;
export type StrongPoint = 'water' | 'wind' | 'fire' | 'magic';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private httpClient: HttpClient) {}

  public getAllHeroes(): Observable<Object> {
    return this.httpClient.get(URL_BASE);
  }

  public getHero(id: number) {
    return this.httpClient.get(`${URL_BASE}${id}`);
  }

  public deleteHero(id: number) {
    return this.httpClient.delete(`${URL_BASE}${id}`);
  }

  public addHero(hero: Hero) {
    return this.httpClient.post(URL_BASE, hero);
  }

  public modifyHero(id: number, hero: Hero) {
    return this.httpClient.patch(`${URL_BASE}${id}`, hero);
  }
}
