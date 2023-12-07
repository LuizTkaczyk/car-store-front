import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangesService } from 'src/app/shared/changes.service';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { fadeIn, loadingAnimation } from 'src/app/shared/fade-in.animation';
import { Subscription, debounceTime, take } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeIn, loadingAnimation]
})

export class PostsComponent implements OnInit, OnDestroy {

  posts: Array<any> = [];
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, "autoplaySpeed": 2000, "arrows": true };
  filters = { page: 1, itemPerPage: 10 };
  currentPage = 1;
  lastPage = 0;
  imageLoading = true;
  withFilter: boolean = false;
  filterSubscription: Subscription = new Subscription();

  constructor(private service: ConnectionService, private changes: ChangesService, private spinner: NgxSpinnerService) { }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.aplyFilters();
    this.callPosts();
    this.getVehiclesPost();
  }
  isEmpty(object: Record<string, any>): boolean {
    const keys = Object.keys(object);
    return keys.length === 0;
  }

  getVehiclesPost() {
    this.spinner.show('primary');
    this.service.getFilteredVehicles(Routes.FILTERED_VEHICLES, this.filters).subscribe(data => {

      if (!this.withFilter) {
        this.posts.push(...data.data);
      } else {
        if (data.current_page === 1) {

          this.posts = data.data
        } else if (data.current_page > 1) {
          this.posts.push(...data.data);
        }
      }
      this.spinner.hide('primary');
      this.currentPage = data.current_page;
      this.lastPage = data.last_page;
    })

  }

  callPosts() {
    this.changes.callPosts.subscribe((call: Boolean) => {
      if (call && (this.currentPage < this.lastPage)) {
        this.filters.page = this.currentPage + 1;
        this.getVehiclesPost();
      }
    })
  }

  aplyFilters() {
    this.filterSubscription = this.changes.changeFilter.pipe(debounceTime(500)).subscribe((filter: any) => {
      if (this.isEmpty(filter)) return;
      this.filters = filter;
      this.withFilter = true;
      this.getVehiclesPost();
    })
  }
}
