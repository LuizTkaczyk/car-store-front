import { NgModule } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { FiltersComponent } from './filters/filters.component';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CurrencyPipe } from '../shared/currency.pipe';
import { HeaderComponent } from './header/header.component';
import { PhonePipe } from '../shared/phone.pipe';


@NgModule({
  declarations: [
    BrandComponent,
    CategoryComponent,
    FiltersComponent,
    PostsComponent,
    HomeComponent,
    ViewPostComponent,
    CurrencyPipe,
    PhonePipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    SlickCarouselModule,
    HeaderComponent
  ],
})
export class HomeModule { }
