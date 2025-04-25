import {Component, inject} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon.model';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PokemonFormComponent} from '../../components/pokemon-form/pokemon-form.component';
import {DialogService} from 'primeng/dynamicdialog';
import {toSignal} from '@angular/core/rxjs-interop';
import {BehaviorSubject, filter, switchMap} from 'rxjs';
import {baseDialogConfig} from '../../app.config';

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

  private refresh$ = new BehaviorSubject<void>(undefined);
  listPokemons = toSignal(this.refresh$.pipe(switchMap(() => this.pokemonService.getAll())))

  showDeleteConfirmation(pokemon: Pokemon) {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer ce pokemon (${pokemon.nom})?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.acceptDelete(pokemon)
    })
  }

  showFormDialog() {
    this.dialogService.open(PokemonFormComponent, {
      ...baseDialogConfig,
      header: 'Add a pokemon',
    }).onClose
      .pipe(filter(refresh => refresh))
      .subscribe(() => this.refresh$.next())
  }

  private acceptDelete(pokemon: Pokemon) {
    this.pokemonService.delete(pokemon.numero)
      .subscribe({
        next: () => {
          this.refresh$.next();
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
}
