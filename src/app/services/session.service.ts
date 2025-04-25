import {Injectable, signal} from '@angular/core';
import {Dresseur} from '../models/dresseur.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  dresseur = signal<Dresseur|null>(null);
}
