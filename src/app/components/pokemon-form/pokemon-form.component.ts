import {Component, ElementRef, inject, output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {PokemonService} from '../../services/pokemon.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pokemon-form',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputNumber,
    InputText,
    Button
  ],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss'
})
export class PokemonFormComponent {
  @ViewChild('imageInput') imageInput!: ElementRef;

  private formBuilder = inject(FormBuilder);
  private pokemonService = inject(PokemonService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);

  typesForm: FormArray = this.formBuilder.array([
    this.formBuilder.control('', { validators: [Validators.required] }),
    this.formBuilder.control(''),
  ]);

  form: FormGroup = this.formBuilder.group({
    numero: [null, [Validators.required, Validators.min(1)]],
    nom: [null, [Validators.required]],
    types: this.typesForm,
    taille: [null, [Validators.required]],
    poids: [null, [Validators.required]],
    image: [null, Validators.required],
  });

  save() {
    if(this.form.invalid) {
      return;
    }

    const fd = new FormData();
    fd.append('numero', this.form.get('numero')?.value!);
    fd.append('nom', this.form.get('nom')?.value!);
    fd.append('poids', this.form.get('poids')?.value!);
    fd.append('taille', this.form.get('taille')?.value!);
    fd.append('image', this.imageInput.nativeElement.files[0]!);
    fd.append('types',
      this.typesForm.value.filter((v: string|null) => !!v).join(',')!
    );

    this.pokemonService.add(fd).subscribe({
      next: () => {
        this.form.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Pokemon saved'
        });
        this.dialogRef.close(true);
      }, error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Pokemon not saved'
        })
      }
    });
  }
}
