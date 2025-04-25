import {Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {DresseurService} from '../../services/dresseur.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  imports: [
    Card,
    InputText,
    FloatLabel,
    Button,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private sessionService = inject(SessionService);
  private dresseurService = inject(DresseurService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  dresseurId: string|null = null;

  login() {
    if(!this.dresseurId) {
      return;
    }
    this.dresseurService.getById(this.dresseurId).subscribe({
      next: dresseur => {
        this.sessionService.dresseur.set(dresseur);
        this.messageService.add({
          severity: 'success',
          summary: 'Login successful'
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login failed'
        })
      }
    })
  }

  goToRegistrationPage() {
    this.router.navigate(['/register']);
  }
}
