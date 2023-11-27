import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Dialog {
  title : 'Título Padrão';
  message : 'Mensagem Padrão';
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data : Dialog) { }
  
}
