import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonIcon],
})
export class HomePage {
  private router = inject(Router)
  public menuAberto: boolean = false;

  constructor() {
    addIcons({
      'menu-outline': menuOutline,
      'close-outline': closeOutline,
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  };

  goToContact() {
    this.router.navigate(['/contact']);
  }

  alternarMenu() {
    this.menuAberto = !this.menuAberto;
  }

  navegarEFechar(rota: string) {
    this.menuAberto = false; // Fecha o menu instantaneamente ao clicar
    this.router.navigate([`/${rota}`]);
  }
}
