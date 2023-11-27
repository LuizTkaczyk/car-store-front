import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChangesService } from 'src/app/shared/changes.service';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { fadeIn, loadingAnimation } from 'src/app/shared/fade-in.animation';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations:[fadeIn, loadingAnimation]
})

export class PostsComponent implements OnInit {

  posts: Array<any> = [];
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, "autoplaySpeed": 2000, "arrows": true };
  array: Array<any> = [];
  brand: number = 0;
  category: number = 0;
  priceFrom: number = 0;
  priceTo: number = 0;
  yearFrom: number = 0;
  yearTo: number = 0;
  page = 0;
  currentPage = 1;
  lastPage = 0;
  imageLoadingState: 'loading' | 'loaded' = 'loading';
  withFilter: boolean = false;
  callPostsEvent: Boolean = true;

  constructor(private service: ConnectionService, private changes: ChangesService) { }
  ngOnInit(): void {
    this.aplyFilters();
    this.callPosts()
  }

  onImageLoad() {
    this.imageLoadingState = 'loaded';
  }
  isEmpty(object: Record<string, any>): boolean {
    const keys = Object.keys(object);
    return keys.length === 0;
  }

  getVehiclesPost() {;
    if(this.callPostsEvent){
        let filters = {
          brandId: this.brand,
          categoryId: this.category,
          priceFrom: this.priceFrom,
          priceTo: this.priceTo,
          yearFrom: this.yearFrom,
          yearTo: this.yearTo,
          page: this.page+=1,
          itemPerPage: 10
        }
        
        this.service.getFilteredVehicles(Routes.FILTERED_VEHICLES, filters).subscribe(data => {
          if(!this.withFilter){
            this.posts.push(...data.data);
          }else{
            if(data.current_page === 1){
              this.posts = data.data
            }else if(data.current_page > 1){
              this.posts.push(...data.data);
            }
          }

          this.currentPage = data.current_page;
          this.lastPage = data.last_page;
        })
    }
  }

  callPosts(){
    this.changes.callPosts.subscribe(( call: Boolean) => {
      console.log(this.currentPage, this.lastPage)
      if(this.currentPage === this.lastPage) return;
      this.getVehiclesPost();
    })
  }

  aplyFilters() {
    this.changes.changeFilter.subscribe((filter: any) => {
      console.log(filter)
      if (this.isEmpty(filter)) return;
      
      this.withFilter = true;
      this.brand = filter.brandId ? filter.brandId : this.brand;
      this.category = filter.categoryId ? filter.categoryId : this.category;
      this.priceFrom = filter.priceFrom ? filter.priceFrom : this.priceFrom;
      this.priceTo = filter.priceTo ? filter.priceTo : this.priceTo;
      this.yearFrom = filter.yearFrom ? filter.yearFrom : this.yearFrom;
      this.yearTo = filter.yearTo ? filter.yearTo : this.yearTo;
      this.page = 0;

      this.getVehiclesPost();
    }) 
  }
}
