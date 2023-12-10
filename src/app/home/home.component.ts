import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangesService } from '../shared/changes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('container') container: ElementRef | undefined;

  constructor(private changes: ChangesService) { }

  onScroll() {
    this.changes.callPost(true);
  }

}
