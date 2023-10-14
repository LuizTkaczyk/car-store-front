import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getActiveRoute();
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

          this.dataSource = [
            { id: 1, name: 'Fiat' },
            { id: 2, name: 'Ford' },
            { id: 3, name: 'Volks' }
          ];
          break;
        case 'categorias':
          this.form = this.formBuilder.group({
            category: [null, [Validators.required, Validators.maxLength(15)]],
          });

          this.dataSource = [
            { id: 1, name: 'Carro' },
            { id: 2, name: 'Moto' },
            { id: 3, name: 'Caminhao' }
          ];
          break;
        case 'veiculos':
          this.form = this.formBuilder.group({
            brand: [null, Validators.required],
            model: [null, [Validators.required, Validators.maxLength(30)]],
            year: [null, [Validators.required, this.anoValido]],
            category: [null, Validators.required],
            price: [null, [Validators.required, this.validatePrice]]
          });
          break;
        case 'contato':
          this.form = this.formBuilder.group({
            contact: [null, [Validators.required, Validators.maxLength(15)]],
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

  save() {
    console.log(this.form.value)
  }
}
