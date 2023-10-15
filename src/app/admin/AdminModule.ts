import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FileInputComponent } from './file-input/file-input/file-input.component';
import { LogoInputComponent } from './file-input/logo-input/logo-input.component';



@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    LoginComponent,
    PanelComponent,
    ListComponent,
    FileInputComponent,
    LogoInputComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ]
})
export class AdminModule {
}
