import { AfterViewInit, ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { ChangesService } from '../shared/changes.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { ConnectionService } from '../shared/connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  selector: string = ".main-panel";
  headerHidden = false;

  mobileQuery: MediaQueryList;

  constructor(private changes: ChangesService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher,private titleService: Title, private connectionService : ConnectionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.connectionService.getJsonValues().subscribe((value) => {
      this.titleService.setTitle(`${value.title} - Inicio`);
    })
  }
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  onScroll() {
    this.changes.callPost(true);
  }

  onScrollHideHeader() {
    this.headerHidden = true;
  }

  onScrollUp() {
      this.headerHidden = false;
  }
}
