import { Vehicle } from './../model/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Observable } from 'rxjs';
import { Routes } from 'src/app/shared/constansts';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['brand', 'model','category', 'year', 'price','edit'];
  vehicles = new Observable<Vehicle[]>();

  constructor(public dialog: MatDialog, private connectionService: ConnectionService,private messageService: MessageService) {}
  ngOnInit(): void {
    this.getVehicles();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.connectionService.delete(Routes.VEHICLES, id).subscribe(data => {
          this.messageService.show('Veículo excluído com sucesso', 'success');
          this.getVehicles();
        })
      }
    });
  }

  getVehicles(){
    this.vehicles = this.connectionService.getAll(Routes.VEHICLES);
  }
}
