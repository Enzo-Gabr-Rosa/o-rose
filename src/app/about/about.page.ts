import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline, menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule]
})
export class AboutPage {

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
