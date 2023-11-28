import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  selectedItemIndex: number | null = 0;

  constructor(private router : Router, public dialog: MatDialog, private connectionService: ConnectionService) { }

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
        const token = localStorage.getItem('token');
        this.connectionService.post(Routes.LOGOUT,{token}).subscribe(data => {
          localStorage.removeItem('token');
          this.selectedItemIndex = null;
          this.router.navigate(['/login']);
        })
      }
    });
  }

  selectItem(index: number): void {
    this.selectedItemIndex = index;
  }
}
