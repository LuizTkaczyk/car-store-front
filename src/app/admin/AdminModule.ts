import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { getDutchPaginatorIntl } from '../shared/translate-paginator-intl';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { FileInputComponent } from './shared/file-input/file-input.component';
import { LogoInputComponent } from './shared/logo-input/logo-input.component';
import { ModalComponent } from './shared/modal/modal.component';

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
    ToastrModule.forRoot({
      maxOpened: 1
    })
  ],
  providers: [
    provideNgxMask(),
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ],

})
export class AdminModule {
}
