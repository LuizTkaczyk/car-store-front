import { Vehicle } from './../model/vehicle.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  vehicles : Vehicle[] = [];
  loading: boolean = false;
  
  page = 0;
  itemsPerPage = 10;
  totalItems  = 0;
  
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

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
        let itemToDelete = this.vehicles.find(item => item.id == id);
        if (itemToDelete) {
          itemToDelete.deleting = true;
        }
        this.connectionService.delete(Routes.VEHICLES, id).subscribe(data => {
          this.messageService.show('Veículo excluído com sucesso', 'success');
          this.vehicles = this.vehicles.filter(item => item.id !== id);
        }, error => {
          if (itemToDelete) {
            itemToDelete.deleting = false;
          }
          this.messageService.show('Erro ao excluir veículo', 'error');
        })
      }
    });
  }

  getVehicles(){
    this.loading = true;
    this.connectionService.getAll(Routes.VEHICLES, this.page, this.itemsPerPage).subscribe(response => {
      this.vehicles = response.data;
      this.totalItems = response.total;
      this.loading = false;
    });
  }
  
  handlePageEvent(event: any) {
    this.page = event.pageIndex + 1; // O índice da página começa em 0
    this.itemsPerPage = event.pageSize;
    this.getVehicles();
  }
}
