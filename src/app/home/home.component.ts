import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ChangesService } from '../shared/changes.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  selector: string = ".main-panel";

  mobileQuery: MediaQueryList;

  constructor(private changes: ChangesService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  onScroll() {
    this.changes.callPost(true);
  }
}
