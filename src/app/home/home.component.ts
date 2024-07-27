import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  headerHidden = false;
  mobileQuery: MediaQueryList;
  showLoadButton: string = '';

  constructor(
    private changes: ChangesService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private titleService: Title,
    private connectionService: ConnectionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.connectionService.getJsonValues().subscribe((value) => {
      this.titleService.setTitle(`${value.title} - Inicio`);
    })

    this.changes.getButton().subscribe((value) => {
      switch (value) {
        case 'nothing':
          this.showLoadButton = 'not-show';
          break;
        case 'have-posts':
          this.showLoadButton = 'show';
          break;
        case 'no-posts':
          this.showLoadButton = 'end-show';
          break;
      }

    })

  }
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  loadCars() {
    this.changes.callPost(true);
  }

}
