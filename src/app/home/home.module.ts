import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularMaterialModule } from '../shared/angular-material.module';
import { CurrencyPipe } from '../shared/currency.pipe';
import { PhonePipe } from '../shared/phone.pipe';
import { FiltersComponent } from './filters/filters.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { PostsComponent } from './posts/posts.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    FiltersComponent,
    PostsComponent,
    HomeComponent,
    ViewPostComponent,
    CurrencyPipe,
    PhonePipe,
    FooterComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    SlickCarouselModule,
    HeaderComponent,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot()
  ],
})
export class HomeModule { }
