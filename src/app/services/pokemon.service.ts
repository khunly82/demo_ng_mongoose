import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Pokemon[]>('http://localhost:3000/pokemon');
  }

  getByNumero(numero: number) {
    return this.httpClient.get<Required<Pokemon>>('http://localhost:3000/pokemon/' + numero);
  }

  add(pokemon: unknown) {
    return this.httpClient.post<Required<Pokemon>>('http://localhost:3000/pokemon', pokemon);
  }

  delete(numero: number) {
    return this.httpClient.delete<Required<Pokemon>>('http://localhost:3000/pokemon/' + numero);
  }
}
