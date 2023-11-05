import { MessageService } from './../shared/message.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';import { Category } from '../model/category.model';
import { Brand } from '../model/brand.model';
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
 
  id: any;
  categories = new Observable<Category[]>();
  brands = new Observable<Brand[]>();
  
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private connectionService: ConnectionService, private messageService: MessageService, private router: Router, private changes: ChangeDetectorRef) { }

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
            images: null
          });

          this.connectionService.getById(Routes.VEHICLES, this.id).subscribe(data => {
            this.form.reset(data);
            this.files = this.form.get('images').value;
            this.changes.markForCheck();
          })
         
          break;
        case 'informacoes':
          this.form = this.formBuilder.group({
            contact: [null, [Validators.required, Validators.maxLength(15)]],
          });
          let dados3 = { id: 1, phone: '4288882111' };
          this.form.reset(dados3);
          break;
      }

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

  save() {
    switch (this.activeRoute) {
      case 'veiculo':
        this.form.get('images').setValue(this.files);
        this.connectionService.put(Routes.VEHICLES, this.form.value, this.id).subscribe(data => {
          this.messageService.show('Veículo editado com sucesso', 'success');
          this.router.navigate(['/admin/lista']);
        }, error => {
          this.messageService.show('Erro ao editar veículo', 'error');
        })
        break;
      case 'informacoes':
        this.connectionService.put(Routes.INFORMATION, this.form.value, this.id).subscribe(data => {
          console.log(data);
        })
        break;

      case 'marca':
        this.connectionService.put(Routes.BRAND, this.form.value, this.id).subscribe(data => {
          this.messageService.show('Marca editada com sucesso', 'success');
          this.router.navigate(['/admin/adicionar/marcas']);
        }, error => {
          this.messageService.show('Erro ao editar marca', 'error');
        })
        break;

      case 'categoria':
        this.connectionService.put(Routes.CATEGORY, this.form.value, this.id).subscribe(data => {
          this.messageService.show('Categoria editada com sucesso', 'success');
          this.router.navigate(['/admin/adicionar/categorias']);
        }, error => {
          this.messageService.show('Erro ao editar categoria', 'error');
        })
        break;

      default:
        break;
    }
  }
}
