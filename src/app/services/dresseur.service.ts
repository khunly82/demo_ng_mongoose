import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dresseur} from '../models/dresseur.model';

@Injectable({
  providedIn: 'root'
})
export class DresseurService {

  private httpClient = inject(HttpClient);

  getById(id: string) {
    return this.httpClient.get<Dresseur>('http://localhost:3000/dresseur/' + id);
  }

  add(dresseur: unknown) {
    return this.httpClient.post<Dresseur>('http://localhost:3000/dresseur', dresseur);
  }

  addPokemon(id: string, pokemon: unknown) {
    return this.httpClient.patch<Dresseur>('http://localhost:3000/dresseur/' + id + '/pokemon', pokemon);
  }
}
