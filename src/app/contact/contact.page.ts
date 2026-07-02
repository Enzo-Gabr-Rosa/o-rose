import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, logoWhatsapp, closeOutline, menuOutline, sparklesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public meuFormulario!: FormGroup;

  public get formularioProjeto(): FormGroup {
    return this.meuFormulario;
  }

  protected nome: string = '';
  protected empresa: string = '';
  protected email: string = '';
  protected projetoSelecionado: string = 'Site institucional';
  protected detalhesProjeto: string = '';

  public menuAberto: boolean = false;

  constructor() {
    addIcons({
      'menu-outline': menuOutline,
      'close-outline': closeOutline,
      'mail-outline': mailOutline,
      'logo-whatsapp': logoWhatsapp,
      'sparkles-outline': sparklesOutline
    });

    this.meuFormulario = this.fb.group({
      nome: ['', [Validators.required]],
      empresa: [''],
      email: ['', [Validators.required, Validators.email]],
      tipoProjeto: ['Site institucional', [Validators.required]],
      conteudoProjeto: ['', [Validators.required]]
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

  goToEmail() {
    window.open('mailto:orose.tech@gmail.com', '_blank');
  }

  goToWhatsapp() {
    window.open('https://wa.me/qr/NQTADEOL45SWN1', '_blank');
  }


  enviarFormulario() {
    if (this.meuFormulario.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dadosForm = this.meuFormulario.value;
    const nomeCliente = dadosForm.nome?.trim() || '[Não informado]';
    const emailCliente = dadosForm.email?.trim() || '[Não informado]';
    const detalhes = dadosForm.conteudoProjeto?.trim() || '[Nenhum detalhe informado]';
    const projeto = this.projetoSelecionado;

    const sufixoEmpresa = dadosForm.empresa?.trim() ? ` da empresa ${dadosForm.empresa.trim()}` : '';

    const assuntoTexto = `Solicitação de orçamento – ${projeto}`;

    const subtituloSobre = '𝐒𝐨𝐛𝐫𝐞 𝐨 𝐩𝐫𝐨𝐣𝐞𝐭𝐨';
    const subtituloAtenciosamente = '𝐀𝐭𝐞𝐧𝐜𝐢𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞,';

    const corpoTexto =
      `Olá, equipe O-Rose!\n\n` +
      `Meu nome é ${nomeCliente}${sufixoEmpresa}.\n\n` +
      `Gostaria de solicitar um orçamento para o desenvolvimento de um ${projeto}.\n\n` +
      `${subtituloSobre}\n\n` +
      `${detalhes}\n\n` +
      `Peço, por gentileza, que o retorno seja enviado para o e-mail:\n\n` +
      `${emailCliente}\n\n` +
      `Desde já, agradeço pela atenção e fico no aguardo do contato.\n\n` +
      `${subtituloAtenciosamente}\n\n` +
      `${nomeCliente}`;

    const assuntoFormatado = encodeURIComponent(assuntoTexto);
    const corpoFormatado = encodeURIComponent(corpoTexto);

    const emailDestino = 'orose.tech@gmail.com';
    const linkMailto = `mailto:${emailDestino}?subject=${assuntoFormatado}&body=${corpoFormatado}`;

    window.open(linkMailto, '_blank');
  }

}
