import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: any;
  activeRoute: string = '';
  currentYear = new Date().getFullYear();

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getActiveRoute();
  }

  getActiveRoute() {
    this.route.url.subscribe(segments => {
      const activeSegment = segments[segments.length - 2].path;
      this.activeRoute = activeSegment;
      console.log(this.activeRoute);

      switch (activeSegment) {
        case 'marca':
          this.form = this.formBuilder.group({
            brand: [null, [Validators.required, Validators.maxLength(15)]],
          });
          let dados0 = { id: 1, brand: 'Fiat'};
          this.form.reset(dados0);
          break;
        case 'categoria':
          this.form = this.formBuilder.group({
            category: [null, [Validators.required, Validators.maxLength(15)]],
          });
          let dados1 = { id: 1, category: 'Carro'};
          this.form.reset(dados1);
          break;
        case 'veiculo':

          
          this.form = this.formBuilder.group({
            brand: [null, Validators.required],
            model: [null, [Validators.required, Validators.maxLength(30)]],
            year: [null, [Validators.required, this.anoValido]],
            category: [null, Validators.required],
            price: [null, [Validators.required, this.validatePrice]]
          });

          let dados2 = { id: 1, brand: '1',category: '1', model: 'Uno mille', year: 2000, price: 10000 };
          this.form.reset(dados2);
          break;
        case 'contato':
          this.form = this.formBuilder.group({
            contact: [null, [Validators.required, Validators.maxLength(15)]],
          });
          let dados3 = { id: 1, phone: '4288882111'};
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

  save() {
    console.log(this.form.value);
  }
}
