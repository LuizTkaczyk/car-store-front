import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { Brand } from '../model/brand.model';
import { Category } from '../model/category.model';
import { ModalComponent } from '../shared/modal/modal.component';
import { MessageService } from './../shared/message.service';
;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: any;
  activeRoute: string = '';
  currentYear = new Date().getFullYear();
  files: any;
  filesToDelete: any;
  deleting: Boolean = false;
  loadingDelete: Boolean = false;
  loadingSave: Boolean = false;

  id: any;
  categories = new Observable<Category[]>();
  brands = new Observable<Brand[]>();

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private formBuilder: FormBuilder, private connectionService: ConnectionService, private messageService: MessageService, private router: Router, private changes: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getActiveRoute();
    this.getBrands();
    this.getCategories();
  }

  getCategories() {
    this.categories = this.connectionService.getAll(Routes.CATEGORY);
  }

  getBrands() {
    this.brands = this.connectionService.getAll(Routes.BRAND);
  }


  getActiveRoute() {
    this.route.url.subscribe(segments => {
      const activeSegment = segments[segments.length - 2].path;
      this.id = segments[segments.length - 1].path;
      this.activeRoute = activeSegment;

      switch (activeSegment) {
        case 'marca':
          this.form = this.formBuilder.group({
            brand: [null, [Validators.required, Validators.maxLength(15)]],
          });

          this.connectionService.getById(Routes.BRAND, this.id).subscribe(data => {
            this.form.reset(data);
          })

          break;
        case 'categoria':
          this.form = this.formBuilder.group({
            category: [null, [Validators.required, Validators.maxLength(15)]],
          });
          this.connectionService.getById(Routes.CATEGORY, this.id).subscribe(data => {
            this.form.reset(data);
          })
          break;
        case 'veiculo':
          this.form = this.formBuilder.group({
            brand_id: [null, Validators.required],
            model: [null, [Validators.required, Validators.maxLength(30)]],
            year: [null, [Validators.required, this.anoValido]],
            category_id: [null, Validators.required],
            price: [null, [Validators.required, this.validatePrice]],
            description: [null, [Validators.maxLength(150)]],
            optional: this.formBuilder.array([this.createOptionalFormGroup()]),
            images: null,
            imagesToDelete: null,
          });

          this.connectionService.getById(Routes.VEHICLES, this.id).subscribe(data => {
            this.form.reset(data);
            if (data.optional.length > 0) {
              const optionalFormArray = this.form.get('optional') as FormArray;

              while (optionalFormArray.length !== 0) {
                optionalFormArray.removeAt(0);
              }

              // Adicionar opcionais do array recebido
              data.optional.forEach((optional: any) => {
                optionalFormArray.push(this.setFormGroup(optional));
              });
            }
            
            this.files = this.form.get('images').value;
            console.log(this.form);
            this.changes.markForCheck();
          })

          break;
        case 'informacoes':
          this.form = this.formBuilder.group({
            contact: [null, [Validators.required, Validators.maxLength(15)]],
          });
          this.connectionService.getById(Routes.INFORMATION, this.id).subscribe(data => {
            this.form.reset(data);
            this.files = this.form.get('logo').value;
            this.changes.markForCheck();
          })
          break;
      }

    });
  }

  private setFormGroup(optional: any): FormGroup {
    return this.formBuilder.group({
      optional: [optional.name]
    });
  }

  anoValido(control: AbstractControl): { [key: string]: boolean } | null {
    const year = control.value;
    const currentYear = new Date().getFullYear();

    if (year < 1900 || year > currentYear + 1) {
      return { 'anoInvalido': true };
    }

    return null;
  }

  validatePrice(control: AbstractControl): ValidationErrors | null {
    const price = control.value;

    if (price !== null && (isNaN(price) || price < 0 || price > 9999999.99)) {
      return { 'priceInvalido': true };
    }

    return null;
  }

  getFiles(event: Array<any>) {
    this.files = event;
  }

  getFilesToDelete(event: Array<any>) {
    this.filesToDelete = event;
  }

  public removeOrClear(i: number, form: string) {
    const option = this.form.get(form) as FormArray
    if (option.length > 1) {
      option.removeAt(i)
    } else {
      option.reset()
    }
  }

  public addOptionalFormGroup() {
    const optional = this.form.get('optional') as FormArray
    optional.push(this.createOptionalFormGroup())
  }

  private createOptionalFormGroup(): any {
    return new FormGroup({
      optional: new FormControl('', Validators.maxLength(30)),
    })
  }

  save() {
    switch (this.activeRoute) {
      case 'veiculo':
        this.loadingSave = true;
        this.form.get('images').setValue(this.files);
        this.form.get('imagesToDelete').setValue(this.filesToDelete);
        this.connectionService.put(Routes.VEHICLES, this.form.value, this.id).subscribe(data => {
          this.messageService.show('Veículo editado com sucesso', 'success');
          this.router.navigate(['/admin/lista']);
          this.loadingSave = false;
        }, error => {
          this.messageService.show('Erro ao editar veículo', 'error');
          if(error.status == 401){
            this.messageService.show('Não autenticado', 'error');
            this.router.navigate(['/login']);
          }
        })
        break;
      case 'marca':
        this.connectionService.put(Routes.BRAND, this.form.value, this.id).subscribe(data => {
          this.messageService.show('Marca editada com sucesso', 'success');
          this.router.navigate(['/admin/adicionar/marcas']);
        }, error => {
          this.messageService.show('Erro ao editar marca', 'error');
          if(error.status == 401){
            this.messageService.show('Não autenticado', 'error');
            this.router.navigate(['/login']);
          }
        })
        break;

      case 'categoria':
        this.connectionService.put(Routes.CATEGORY, this.form.value, this.id).subscribe(data => {
          this.messageService.show('Categoria editada com sucesso', 'success');
          this.router.navigate(['/admin/adicionar/categorias']);
        }, error => {
          this.messageService.show('Erro ao editar categoria', 'error');
          if(error.status == 401){
            this.messageService.show('Não autenticado', 'error');
            this.router.navigate(['/login']);
          }
        })
        break;

      default:
        break;
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
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
      this.loadingDelete = true;
      if (result) {
        this.deleting = true;
        //this.vehicleToDeleteId = id
        this.connectionService.delete(Routes.VEHICLES, this.id).subscribe(data => {
          this.deleting = false;
          this.messageService.show('Veículo excluído com sucesso', 'success');
          this.router.navigate(['/admin/lista']);
          this.loadingDelete = false;
        })
      }
    });
  }
}
