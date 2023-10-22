import { Observable } from 'rxjs';
import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../shared/modal/modal.component';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { Category } from '../model/category.model';
import { Brand } from '../model/brand.model';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  activeRoute: string = '';
  form: any;
  dataSource: Array<any> = [];
  displayedColumns: string[] = ['name', 'edit'];
  currentYear = new Date().getFullYear();
  files: any;
  clearFiles: Boolean = false;
  categories = new Observable<Category[]>();
  brands = new Observable<Brand[]>();

  states = [
    {
      "id": "1",
      "nome": "Acre",
      "sigla": "AC",
      "sigla_slug": "ac",
      "slug": "acre"
    },
    {
      "id": "2",
      "nome": "Alagoas",
      "sigla": "AL",
      "sigla_slug": "al",
      "slug": "alagoas"
    },
    {
      "id": "3",
      "nome": "Amazonas",
      "sigla": "AM",
      "sigla_slug": "am",
      "slug": "amazonas"
    },
    {
      "id": "4",
      "nome": "Amapá",
      "sigla": "AP",
      "sigla_slug": "ap",
      "slug": "amapa"
    },
    {
      "id": "5",
      "nome": "Bahia",
      "sigla": "BA",
      "sigla_slug": "ba",
      "slug": "bahia"
    },
    {
      "id": "6",
      "nome": "Ceará",
      "sigla": "CE",
      "sigla_slug": "ce",
      "slug": "ceara"
    },
    {
      "id": "7",
      "nome": "Distrito Federal",
      "sigla": "DF",
      "sigla_slug": "df",
      "slug": "distrito-federal"
    },
    {
      "id": "8",
      "nome": "Espírito Santo",
      "sigla": "ES",
      "sigla_slug": "es",
      "slug": "espirito-santo"
    },
    {
      "id": "9",
      "nome": "Goiás",
      "sigla": "GO",
      "sigla_slug": "go",
      "slug": "goias"
    },
    {
      "id": "10",
      "nome": "Maranhão",
      "sigla": "MA",
      "sigla_slug": "ma",
      "slug": "maranhao"
    },
    {
      "id": "11",
      "nome": "Minas Gerais",
      "sigla": "MG",
      "sigla_slug": "mg",
      "slug": "minas-gerais"
    },
    {
      "id": "12",
      "nome": "Mato Grosso do Sul",
      "sigla": "MS",
      "sigla_slug": "ms",
      "slug": "mato-grosso-do-sul"
    },
    {
      "id": "13",
      "nome": "Mato Grosso",
      "sigla": "MT",
      "sigla_slug": "mt",
      "slug": "mato-grosso"
    },
    {
      "id": "14",
      "nome": "Pará",
      "sigla": "PA",
      "sigla_slug": "pa",
      "slug": "para"
    },
    {
      "id": "15",
      "nome": "Paraíba",
      "sigla": "PB",
      "sigla_slug": "pb",
      "slug": "paraiba"
    },
    {
      "id": "16",
      "nome": "Pernambuco",
      "sigla": "PE",
      "sigla_slug": "pe",
      "slug": "pernambuco"
    },
    {
      "id": "17",
      "nome": "Piauí",
      "sigla": "PI",
      "sigla_slug": "pi",
      "slug": "piaui"
    },
    {
      "id": "18",
      "nome": "Paraná",
      "sigla": "PR",
      "sigla_slug": "pr",
      "slug": "parana"
    },
    {
      "id": "19",
      "nome": "Rio de Janeiro",
      "sigla": "RJ",
      "sigla_slug": "rj",
      "slug": "rio-de-janeiro"
    },
    {
      "id": "20",
      "nome": "Rio Grande do Norte",
      "sigla": "RN",
      "sigla_slug": "rn",
      "slug": "rio-grande-do-norte"
    },
    {
      "id": "21",
      "nome": "Rondônia",
      "sigla": "RO",
      "sigla_slug": "ro",
      "slug": "rondonia"
    },
    {
      "id": "22",
      "nome": "Roraima",
      "sigla": "RR",
      "sigla_slug": "rr",
      "slug": "roraima"
    },
    {
      "id": "23",
      "nome": "Rio Grande do Sul",
      "sigla": "RS",
      "sigla_slug": "rs",
      "slug": "rio-grande-do-sul"
    },
    {
      "id": "24",
      "nome": "Santa Catarina",
      "sigla": "SC",
      "sigla_slug": "sc",
      "slug": "santa-catarina"
    },
    {
      "id": "25",
      "nome": "Sergipe",
      "sigla": "SE",
      "sigla_slug": "se",
      "slug": "sergipe"
    },
    {
      "id": "25",
      "nome": "São Paulo",
      "sigla": "SP",
      "sigla_slug": "sp",
      "slug": "sao-paulo"
    },
    {
      "id": "27",
      "nome": "Tocantins",
      "sigla": "TO",
      "sigla_slug": "to",
      "slug": "tocantins"
    }
  ];


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog, private connectionService: ConnectionService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getActiveRoute();

    switch (this.activeRoute) {
      case 'veiculos':
        this.getCategories();
        this.getBrands();
        break;
      case 'informacoes':

        break;

      case 'marcas':
        this.getBrands();
        break;

      case 'categorias':
        this.getCategories();
        break;

      default:
        break;
    }


  }

  getCategories() {
    this.categories = this.connectionService.getAll(Routes.CATEGORY);
  }

  getBrands() {
    this.brands = this.connectionService.getAll(Routes.BRAND);
  }

  getActiveRoute() {
    this.route.url.subscribe(segments => {
      const activeSegment = segments[segments.length - 1].path;
      this.activeRoute = activeSegment;

      switch (activeSegment) {
        case 'marcas':
          this.form = this.formBuilder.group({
            brand: [null, [Validators.required, Validators.maxLength(15)]],
          });
          break;
        case 'categorias':
          this.form = this.formBuilder.group({
            category: [null, [Validators.required, Validators.maxLength(15)]],
          });
          break;
        case 'veiculos':
          this.form = this.formBuilder.group({
            model: [null, [Validators.required, Validators.maxLength(30)]],
            brand_id: [null, Validators.required],
            category_id: [null, Validators.required],
            year: [null, [Validators.required, this.anoValido]],
            price: [null, [Validators.required, this.validatePrice]],
            files: null
          });
          break;
        case 'informacoes':
          this.form = this.formBuilder.group({
            company_name: [null, [Validators.required, Validators.maxLength(15)]],
            cnpj_cpf: [null],
            address: [null, [Validators.required]],
            address_number: [null, [Validators.required]],
            city: [null, [Validators.required]],
            state: [null, [Validators.required]],
            contact: this.formBuilder.array([this.createContactFormGroup()]),
            logo: null
          });
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

  private createContactFormGroup(): FormGroup {
    return new FormGroup({
      number: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    })
  }

  public addContactFormGroup() {
    const contact = this.form.get('contact') as FormArray
    contact.push(this.createContactFormGroup())
  }

  public removeOrClearContact(i: number) {
    const contact = this.form.get('contact') as FormArray
    if (contact.length > 1) {
      contact.removeAt(i)
    } else {
      contact.reset()
    }
  }

  getFiles(event: any) {
    this.files = event;
  }

  resetForm() {
    this.form.reset();
    this.clearFiles = true;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        switch (this.activeRoute) {
          case 'marcas':
            this.connectionService.delete(Routes.BRAND, id).subscribe(data => {
              this.messageService.show('Marca excluída com sucesso', 'success');
              this.getBrands();
            }, error => {
              this.messageService.show('Erro ao excluir marca', 'error');
            })
          break;

          case 'categorias':
            this.connectionService.delete(Routes.CATEGORY, id).subscribe(data => {
              this.messageService.show('Categoria excluída com sucesso', 'success');
              this.getCategories();
            }, error => {
              this.messageService.show('Erro ao excluir categoria', 'error');
            })
          break;
        }


      }
    });
  }

  save() {
    switch (this.activeRoute) {
      case 'veiculos':
        this.form.get('files').setValue(this.files);
        this.connectionService.post(Routes.VEHICLES, this.form.value).subscribe(data => {
          console.log(data);
        })
        break;
      case 'informacoes':
        this.connectionService.post(Routes.INFORMATION, this.form.value).subscribe(data => {
          console.log(data);
        })
        break;

      case 'marcas':
        this.connectionService.post(Routes.BRAND, this.form.value).subscribe(data => {
          this.form.reset();
          this.getBrands();
          this.messageService.show('Marca cadastrada com sucesso', 'success');
        }, error => {
          this.messageService.show('Erro ao cadastrar marca', 'error');
        })
        break;

      case 'categorias':
        this.connectionService.post(Routes.CATEGORY, this.form.value).subscribe(data => {
          this.form.reset();
          this.getCategories();
          this.messageService.show('Categoria cadastrada com sucesso', 'success');
        }, error => {
          this.messageService.show('Erro ao cadastrar categoria', 'error');
        })
        break;

      default:
        break;
    }
    console.log(this.form.value)
  }



}

