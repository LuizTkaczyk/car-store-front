import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { MessageService } from '../shared/message.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { Vehicle } from './../model/vehicle.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ChangesService } from 'src/app/shared/changes.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['brand', 'model', 'category', 'year', 'price', 'edit'];
  vehicles: Vehicle[] = [];

  dataSource = new MatTableDataSource(this.vehicles);

  loading: boolean = false;

  page = 0;
  itemsPerPage = 10;
  totalItems = 0;

  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  inputFilter = new FormControl<string>('');
  mobileQuery: MediaQueryList;
  editButtons: boolean = true;

  constructor(public dialog: MatDialog, private connectionService: ConnectionService, private messageService: MessageService, private changes: ChangesService,private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.editButtons = !this.mobileQuery.matches;
    this.applyFilter();
    this.getVehicles();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Excluir',
        message: 'Tem certeza que deseja excluir?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
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

  getVehicles() {
    this.loading = true;
    this.connectionService.getAll(Routes.VEHICLES, this.page, this.itemsPerPage).subscribe(response => {
      this.vehicles = response.data;
      this.totalItems = response.total;
      this.loading = false;
    });
  }

  handlePageEvent(event: any) {
    this.page = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getVehicles();
  }

  applyFilter() {
    this.changes.searchVehicle.subscribe(data => {
      this.connectionService.getFilteredVehicles(Routes.VEHICLES, { name: data }).subscribe(response => {
        this.vehicles = response.data;
        this.totalItems = response.total;
        this.loading = false;
      })
    })
  }
}

