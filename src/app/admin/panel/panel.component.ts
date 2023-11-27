import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  constructor(private router : Router, public dialog: MatDialog) { }

  // logout(){
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);

  // }

  logout(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Sair',
        message: 'Tem certeza que deseja sair?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
