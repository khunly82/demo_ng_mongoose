import {Component, inject} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon.model';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Dialog} from 'primeng/dialog';
import {PokemonFormComponent} from '../../components/pokemon-form/pokemon-form.component';

@Component({
  imports: [
    TableModule,
    Button,
    Dialog,
    PokemonFormComponent
  ],
  templateUrl: './pokemon-index.component.html',
  styleUrl: './pokemon-index.component.scss'
})
export class PokemonIndexComponent {
  private pokemonService = inject(PokemonService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  listPokemons: Pokemon[] = [];
  formVisible = false;

  constructor() {
    this.loadData();
  }

  delete(pokemon: any) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce pokemon ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pokemonService.delete(pokemon.numero)
          .subscribe({
            next: () => {
              this.loadData();
              this.messageService.add({
                severity: 'success',
                summary: 'Pokemon deleted'
              })
            }, error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Pokemon not deleted'
              })
            }
          })
      }
    })
  }

  private loadData() {
    this.pokemonService.getAll()
      .subscribe({
        next:  pokemons => this.listPokemons = pokemons
      });
  }

  displayDialog() {
    this.formVisible = true;
  }

  onVisibilityChange(event: boolean) {
    this.formVisible = event;
    if(!event) {
      this.loadData();
    }
  }
}
