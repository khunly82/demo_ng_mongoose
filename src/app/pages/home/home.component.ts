import {Component, inject} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {DataView} from 'primeng/dataview';
import {Card} from 'primeng/card';

@Component({
  imports: [
    DataView,
    Card
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private sessionService = inject(SessionService);
  dresseur = this.sessionService.dresseur;
}
