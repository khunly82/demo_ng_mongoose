import {Component, inject} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {DresseurService} from '../../services/dresseur.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {FormErrorComponent} from '../../components/form-error/form-error.component';

@Component({
  imports: [
    Button,
    Card,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    InputNumber,
    FormErrorComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private sessionService = inject(SessionService);
  private dresseurService = inject(DresseurService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    nom: [null, [Validators.required]],
    age: [null, [Validators.required]],
  });

  register() {
    if(this.form.invalid) {
      return;
    }
    this.dresseurService.add(this.form.value).subscribe({
      next: dresseur => {
        this.sessionService.dresseur.set(dresseur);
        this.messageService.add({
          severity: 'success',
          summary: 'Registration successful',
          detail: `Votre id: ${dresseur.id}. Vous avez recu un : ${dresseur.pokemons[0].raceNom}`
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration failed'
        })
      }
    })
  }
}
