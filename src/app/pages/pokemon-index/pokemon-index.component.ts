import {Component, inject} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon.model';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PokemonFormComponent} from '../../components/pokemon-form/pokemon-form.component';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  imports: [
    TableModule,
    Button,
  ],
  templateUrl: './pokemon-index.component.html',
  styleUrl: './pokemon-index.component.scss'
})
export class PokemonIndexComponent {
  private pokemonService = inject(PokemonService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  listPokemons: Pokemon[] = [];

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
    this.dialogService.open(PokemonFormComponent, {
      header: 'Add a pokemon',
      width: '50vw',
      closable: true,
      dismissableMask: true,
      modal: true,
    }).onClose.subscribe(result => {
      if(result) {
        this.loadData();
      }
    })
  }
}
