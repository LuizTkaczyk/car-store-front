import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FileInputComponent } from './shared/file-input/file-input.component';
import { LogoInputComponent } from './shared/logo-input/logo-input.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from '../shared/translate-paginator-intl';
// import localePt from '@angular/common/locales/pt';

// registerLocaleData(localePt);

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    LoginComponent,
    PanelComponent,
    ListComponent,
    FileInputComponent,
    LogoInputComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideNgxMask(),
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ],
  
})
export class AdminModule {
}
